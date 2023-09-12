import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, MongoClientOptions } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://MaxByng-Maddick:Kismetuni66@cluster0.a31ajbo.mongodb.net/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { Type } = req.query;


    try {
      // Connect to the MongoDB cluster
      const client = await MongoClient.connect(MONGODB_URI, {
        useUnifiedTopology: true,
      } as MongoClientOptions);

      const db = client.db('GeneralApp');
      const collection = db.collection('Challenges');

      // Search for documents with the matching type
      const query = { Type };
      const vaildDocument = await collection.findOne(query);

      if (vaildDocument) {
   
        
          // Matching setup found
          console.log('Type  found');
          res.status(200).json({  message: 'Success',data: vaildDocument});
       
      } else {
        // User with the matching username not found
        console.error('Type not found');
        res.status(404).json({ message: 'Type not found'+Type });
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