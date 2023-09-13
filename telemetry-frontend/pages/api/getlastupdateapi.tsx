import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, MongoClientOptions } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://MaxByng-Maddick:Kismetuni66@cluster0.a31ajbo.mongodb.net/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { collectionName } = req.query;

    try {
      if (typeof collectionName !== 'string') {
        throw new Error('Collection name must be a string');
      }

      // Connect to the MongoDB cluster
      const client = await MongoClient.connect(MONGODB_URI, {
        useUnifiedTopology: true,
      } as MongoClientOptions);

      // Access the database
      const db = client.db("GeneralApp");

      // Access the specified collection
      const collection = db.collection(collectionName);

      if (!collection) {
        // Collection not found
        console.error(`No ${collectionName} collection found`);
        res.status(404).json({ message: `No ${collectionName} collection found` });
      } else {
        // Find the first document in the collection
        const queryResult = await collection.findOne({}, { sort: { lastUpdatedDate: 1 } });

        if (queryResult) {
          // Document found
          const { lastUpdatedDate } = queryResult;
          res.status(200).json({ message: 'Success', data: { lastUpdatedDate } });
        } else {
          // Document not found
          console.error(`No data found in ${collectionName}`);
          res.status(404).json({ message: `No data found in ${collectionName}` });
        }
      }

      // Close the database connection
      client.close();
    } catch (error) {
      console.error('Error searching for data:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
