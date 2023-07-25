import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, MongoClientOptions } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://MaxByng-Maddick:Kismetuni66@cluster0.a31ajbo.mongodb.net/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { username, setup } = req.query;


    try {
      // Connect to the MongoDB cluster
      const client = await MongoClient.connect(MONGODB_URI, {
        useUnifiedTopology: true,
      } as MongoClientOptions);

      // Access the database and collection
      const db = client.db('Data');
      const collection = db.collection('Setups');

      // Search for documents with the matching username
      const query = { username, name: setup };
      const setupNames = await collection
        .find(query)
        .project({ name: 1 })
        .toArray();

      if (setupNames.length > 0) {
         // User with the matching username and setup found
        console.log('User and setup found');
        res.status(200).json({ setupNames });
      } else {
         // User with the matching username and setup not found
        console.error('User and setup not found');
        res.status(200).json({ setupNames: []  });
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