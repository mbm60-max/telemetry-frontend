import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, MongoClientOptions } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://MaxByng-Maddick:Kismetuni66@cluster0.a31ajbo.mongodb.net/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { username, settingsname } = req.query;


    try {
      // Connect to the MongoDB cluster
      const client = await MongoClient.connect(MONGODB_URI, {
        useUnifiedTopology: true,
      } as MongoClientOptions);

      const db = client.db('Data');
      const collection = db.collection('Settings');

      // Search for documents with the matching username
      const query = { username };
      const userDocument = await collection.findOne(query);

      if (userDocument) {
        // Find the matching setup item in the setups array
        const matchingSettings = userDocument.settings.find((s: { settingsname: string }) => s.settingsname === settingsname);

        if (matchingSettings) {
          // Matching setup found
          console.log('User and settings found');
          res.status(200).json({ setupData: matchingSettings});
        } else {
          // Matching setup not found
          console.error('Matching settings not found');
          res.status(404).json({ message: 'Settings not found for the user' });
        }
      } else {
        // User with the matching username not found
        console.error('User not found');
        res.status(404).json({ message: 'User not found'+username });
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