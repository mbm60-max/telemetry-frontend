import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, MongoClientOptions } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://MaxByng-Maddick:Kismetuni66@cluster0.a31ajbo.mongodb.net/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { username } = req.query;

    try {
      // Connect to the MongoDB cluster
      const client = await MongoClient.connect(MONGODB_URI, {
        useUnifiedTopology: true,
      } as MongoClientOptions);

      // Access the database and collection
      const db = client.db('Data');
      const setupsCollection = db.collection('setups');
      // Find the document with the matching username
      const userDocument = await setupsCollection.findOne({ username });

      if (userDocument && userDocument.setups.length > 0) {
        // User with the matching username found and setups array exists
        console.log('User found');
        res.status(200).json({ setups: userDocument.setups });
      } else {
        // User with the matching username not found or setups array is empty
        console.error('User not found or setups array is empty');
        res.status(200).json({ setups: [] });
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
