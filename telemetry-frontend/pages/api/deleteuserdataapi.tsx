import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, MongoClientOptions } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://MaxByng-Maddick:Kismetuni66@cluster0.a31ajbo.mongodb.net/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      const { username, collectionName, databaseName } = req.body;
      try {
        // Connect to the MongoDB cluster
        const client = await MongoClient.connect(MONGODB_URI, {
          useUnifiedTopology: true,
        } as MongoClientOptions);
  
        // Access the database
        const db = client.db(databaseName);
  
        // Create or access the "setups" collection
        const SettingsCollection = db.collection(collectionName);
  
        if (collectionName === username) {
            // Drop the collection if it exists
            const collections = await db.listCollections({ name: collectionName }).toArray();
            if (collections.length > 0) {
              await db.collection(collectionName).drop();
            }else{
                res.status(200).json({ message: 'Colelction never existed ' });
            }
          } else {
            // Find the document with the specified username
        const userDoc = await SettingsCollection.findOneAndDelete({ username: username });

        if (!userDoc.value) {
          // Return an error that the specific requested document doesn't exist
          res.status(200).json({ message: 'Document never existed ' });
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