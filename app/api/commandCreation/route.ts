import { NextRequest, NextResponse } from "next/server";
import {  PrismaClient } from '@prisma/client';

// Named export for the POST method
export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();

  try {
    // Parse the request body
    const { description, heading, imageUrl } = await req.json();

    // Validate description (optional)
    if (!description || typeof description !== 'string') {
      throw new Error('Invalid description: Please provide a string value.');
    }

    if (!heading || typeof heading !== 'string') {
      throw new Error('Invalid heading: Please provide a string value.');
    }

    // Create data with Prisma
    const createdData = await prisma.data.create({
      data: {
        heading,
        imageUrl,
        description
      },
    });

    return NextResponse.json({
      id: createdData.id,
      message: 'Data created successfully!',
    });
  } catch (error) {
    console.error(error);
  }
}

export async function GET() {
    const prisma = new PrismaClient();


    const body = await prisma.data.findMany()

    return NextResponse.json({
        body
    })
}


// Improved DELETE handler with error handling and filtering (optional)

// DELETE handler with error handling and filtering
export async function DELETE() {
    const prisma = new PrismaClient()


    await prisma.data.deleteMany({})
    return NextResponse.json({ msg: "All posts deleted successfully" });
}

