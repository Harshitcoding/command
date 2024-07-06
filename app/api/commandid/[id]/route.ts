import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient();

  // Extract the ID from the URL path concisely
  const id = request.nextUrl.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ message: 'Missing ID parameter' }, { status: 400 });
  }

  try {
    const command = await prisma.data.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!command) {
      return NextResponse.json({ message: 'Command not found' }, { status: 404 });
    }

    return NextResponse.json(command);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
