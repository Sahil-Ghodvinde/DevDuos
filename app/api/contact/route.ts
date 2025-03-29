import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// MongoDB connection string - you'll need to add this to your .env.local file
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await MongoClient.connect(uri as string);
    const db = client.db('devkstra'); // Replace with your database name
    const collection = db.collection('user_queries');

    // Insert the message
    await collection.insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    // Close the connection
    await client.close();

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json(
      { error: 'Failed to save message' },
      { status: 500 }
    );
  }
} 