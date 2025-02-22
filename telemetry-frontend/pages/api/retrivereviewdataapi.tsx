import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, MongoClientOptions } from 'mongodb';
import { AuthContext } from '../../components/authProvider';
import { useContext } from 'react';

const MONGODB_URI = 'mongodb+srv://MaxByng-Maddick:Kismetuni66@cluster0.a31ajbo.mongodb.net/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { username, lapDate } = req.query;

    try {
      // Connect to the MongoDB cluster
      const client = await MongoClient.connect(MONGODB_URI, {
        useUnifiedTopology: true,
      } as MongoClientOptions);

      // Access the database
      const db = client.db('UserSessions');
      console.log(username);
      // Search for a collection with the matching username
      if(typeof username == "string"){
        const collection = db.collection(username);
        if (collection) {
            // Collection with the matching username found
            const lapDataQuery = { DateReceived: lapDate };
            const lapDataResult = await collection.findOne(lapDataQuery);
    
            if (lapDataResult) {
              // Document with matching lap data found
              res.status(200).json({ message: 'Success', data: lapDataResult });
            } else {
              // Document with matching lap data not found
              console.error('No user lap data found');
              res.status(200).json({ message: 'No user lap data found' });
            }
          } else {
            // Collection with the matching username not found
            console.error('No user collection found');
            res.status(200).json({ message: 'No user collection found' });
          }
      }else{
        console.error('No user provided');
        res.status(200).json({ message: 'No user provided' });
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
