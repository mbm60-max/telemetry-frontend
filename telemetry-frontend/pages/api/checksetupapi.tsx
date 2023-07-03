import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, MongoClientOptions } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://MaxByng-Maddick:Kismetuni66@cluster0.a31ajbo.mongodb.net/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { name } = req.query;

    try {
      // Connect to the MongoDB cluster
      const client = await MongoClient.connect(MONGODB_URI, {
        useUnifiedTopology: true,
      } as MongoClientOptions);

      // Access the database and collection
      const db = client.db('Data');
      const collection = db.collection('Setups');

      // Search for a document with the matching username
      const nameQuery = { name };
      const nameResult = await collection.findOne(nameQuery);

      if (nameResult) {
        // User with the matching username found
        // Now check if the password matches
        console.log('User found');
        res.status(200).json({ message: 'Success' });
        
      } else {
        // User with the matching username not found
        console.error('User not found');
        res.status(200).json({ message: 'User not found' });
      }

      // Close the database connection
      client.close();
    } catch (error) {
      console.error('Error searching for user:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;