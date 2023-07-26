import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, MongoClientOptions } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://MaxByng-Maddick:Kismetuni66@cluster0.a31ajbo.mongodb.net/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, setupname ,setupObject  } = req.body;
    try {
      // Connect to the MongoDB cluster
      const client = await MongoClient.connect(MONGODB_URI, {
        useUnifiedTopology: true,
      } as MongoClientOptions);

      // Access the database
      const db = client.db('Data');

      // Create or access the "setups" collection
      const setupsCollection = db.collection('setups');

      // Check if the document for the provided username exists in the "setups" collection
      const userSetupDoc = await setupsCollection.findOne({ username });

      if (!userSetupDoc) {
        // If the document for the user doesn't exist, create a new one
        await setupsCollection.insertOne({ username, setups: [] });
      }

      // Update the document by pushing the new setupObject into the setups array
      await setupsCollection.updateOne(
        { username },
        { $push: { setups: { setupname, setupObject } } }
      );

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