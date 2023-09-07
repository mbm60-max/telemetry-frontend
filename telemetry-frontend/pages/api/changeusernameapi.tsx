import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, MongoClientOptions } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://MaxByng-Maddick:Kismetuni66@cluster0.a31ajbo.mongodb.net/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      const { newUsername, oldUsername, collectionName, databaseName } = req.body;
      try {
        // Connect to the MongoDB cluster
        const client = await MongoClient.connect(MONGODB_URI, {
          useUnifiedTopology: true,
        } as MongoClientOptions);
  
        // Access the database
        const db = client.db(databaseName);
  
        // Create or access the "setups" collection
        const SettingsCollection = db.collection(collectionName);
  
        if (collectionName === oldUsername) {
        // If collectionName is the same as oldUsername, copy the old collection and update the Username field
        const copiedCollectionName = newUsername;

        // Access the source and target collections
        const oldCollection = db.collection(oldUsername);
        // Check if the target collection exists, and create it if not
        const newCollectionExists = await db.listCollections({ name: copiedCollectionName }).hasNext();

        if (!newCollectionExists) {
          await db.createCollection(copiedCollectionName);
        }
        const newCollection = db.collection(copiedCollectionName);
        // Find all documents in the old collection
        const documents = await oldCollection.find().toArray();

        // Insert the documents into the new collection and update Username field
        const updatedDocuments = documents.map((document) => ({
          ...document,
          Username: newUsername,
        }));

        await newCollection.insertMany(updatedDocuments);

        // Delete the old collection
        await oldCollection.drop();
        } else {
          // Find the document with the specified username
          const userDoc = await SettingsCollection.findOne({ username: oldUsername });
  
          if (!userDoc) {
            // Return an error that the specific requested document doesn't exist
            res.status(404).json({ message: 'Document not found' });
          } else {
            // If the document exists, update it by replacing the username field with the newUsername variable,
            // leaving everything else the same
            await SettingsCollection.updateOne(
              { username: oldUsername },
              { $set: { username: newUsername } }
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