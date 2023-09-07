import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, MongoClientOptions } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://MaxByng-Maddick:Kismetuni66@cluster0.a31ajbo.mongodb.net/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      const { newPassword,userName} = req.body;
      try {
        // Connect to the MongoDB cluster
        const client = await MongoClient.connect(MONGODB_URI, {
          useUnifiedTopology: true,
        } as MongoClientOptions);
  
        // Access the database
        const db = client.db("Test");
  
        // Create or access the "setups" collection
        const SettingsCollection = db.collection("Users");
  
        {
          // Find the document with the specified username
          const userDoc = await SettingsCollection.findOne({ username: userName });
  
          if (!userDoc) {
            // Return an error that the specific requested document doesn't exist
            res.status(404).json({ message: 'Document not found' });
          } else {
            // If the document exists, update it by replacing the username field with the newUsername variable,
            // leaving everything else the same
            await SettingsCollection.updateOne(
              { username: userName },
              { $set: { password: newPassword } }
            );
          }
        }
  
        // Close the database connection
        client.close();
  
        res.status(200).json({ message: 'Operation completed successfully' });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  };
  
  export default handler;