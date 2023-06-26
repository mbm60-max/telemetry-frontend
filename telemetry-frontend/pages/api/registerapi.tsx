import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, MongoClientOptions } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://MaxByng-Maddick:Kismetuni66@cluster0.a31ajbo.mongodb.net/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Connect to the MongoDB cluster
      const client = await MongoClient.connect(MONGODB_URI, {
        useUnifiedTopology: true,
      } as MongoClientOptions);
      // Access the database and collection
      const db = client.db('Test');
      const collection = db.collection('Users');
      // Create a new document with the username and password
      const document = { username, password };
      await collection.insertOne(document);

      // Close the database connection
      client.close();

      res.status(200).json({ message: 'Document inserted successfully' });
    } catch (error) {
      console.error('Error inserting document:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
