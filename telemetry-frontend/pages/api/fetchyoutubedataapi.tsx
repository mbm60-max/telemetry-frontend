

import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, MongoClientOptions } from 'mongodb';
import { AuthContext } from '../../components/authProvider';
import { useContext } from 'react';

const MONGODB_URI = 'mongodb+srv://MaxByng-Maddick:Kismetuni66@cluster0.a31ajbo.mongodb.net/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { searchQuery } = req.query;

    try {
      // Connect to the MongoDB cluster
      const client = await MongoClient.connect(MONGODB_URI, {
        useUnifiedTopology: true,
      } as MongoClientOptions);

      // Access the database
          // Access the database and collection
          const db = client.db('GeneralApp');
          const collection = db.collection('Videos');
    
          
        if (collection) {
            // Collection found
            const queryToCheck = { Videos:searchQuery };
          const queryResult = await collection.findOne(queryToCheck);
    
            if (queryResult) {
              // Document found
              res.status(200).json({ message: 'Success', data: queryResult });
            } else {
              // Document  not found
              console.error('No Videos data found');
              res.status(200).json({ message: 'No Videos data found' });
            }
          } else {
            // Collectionnot found
            console.error('No Videos collection found');
            res.status(200).json({ message: 'No Videos collection found' });
          }
      // Close the database connection
      client.close();
    }  catch (error) {
        console.error('Error searching for Videos:', error);
        res.status(500).json({ message: 'An error occurred' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  };

export default handler;