'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';

interface FormProps {}

const Form: React.FC<FormProps> = () => {
  const router = useRouter();

  const [heading, setHeading] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<File | null>(null);

  const uploadFile = async (): Promise<string | null> => {
    if (imageUrl == null) return null;
    const imageRef = ref(storage, `images/${imageUrl.name + uuidv4()}`);

    try {
      const snapshot = await uploadBytes(imageRef, imageUrl);
      const url = await getDownloadURL(snapshot.ref);
      setImageUrl(null);
      return url;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleSubmit = async () => {
    const imageUrl = await uploadFile();

    if (imageUrl) {
      try {
        const response = await axios.post('http://localhost:3000/api/commandCreation', {
          imageUrl,
          heading,
          description,
        });
        console.log(response.data);
        setHeading('');
        setDescription('');
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageUrl(e.target.files[0]);
    } else {
      setImageUrl(null);
    }
  };

  const handleEditorChange = (content: string) => {
    setDescription(content);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 mt-36">
      <div className='text-3xl text-red-300'>
      <b>ADD COMMANDS</b>
      </div>
      <div className="text-center space-y-2 ">
        <div>
          <input
            className="border rounded-lg pl-4 pr-8 py-2 w-full sm:w-[40rem] text-black"
            type="text"
            placeholder="Enter a heading"
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>

        <div>
          <Editor
            apiKey="g2pwk6u14jm25kpzccf31nzakxx780kx2q21386em7ca5ro5"
            onEditorChange={handleEditorChange}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help',
            }}
          />
        </div>

        <div className="w-full sm:w-[40rem]">
          <input
            type="file"
            id="image"
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={handleImageChange}
          />
        </div>

        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Create Command
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;