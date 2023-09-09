import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, MongoClientOptions } from 'mongodb';
import { AuthContext } from '../../components/authProvider';
import { useContext } from 'react';

const MONGODB_URI = 'mongodb+srv://MaxByng-Maddick:Kismetuni66@cluster0.a31ajbo.mongodb.net/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { username } = req.query;

    try {
      // Connect to the MongoDB cluster
      const client = await MongoClient.connect(MONGODB_URI, {
        useUnifiedTopology: true,
      } as MongoClientOptions);

      // Access the database
      const db = client.db('UserSessions');

      // Search for a collection with the matching username
      if (typeof username === 'string') {
        const collection = db.collection(username);
        if (collection) {
          // Collection with the matching username found
          const lapDataResult = await collection.find({}, { projection: { DateReceived: 1, Track: 1, Car: 1, BestLapTime: 1 } }).toArray();
          console.log(lapDataResult);

          if (lapDataResult.length > 0) {
            // Documents found
            const lapData = lapDataResult.map((doc) => ({
              id: lapDataResult.indexOf(doc) + 1,
              date: doc.DateReceived,
              bestlaptime: doc.BestLapTime,
              track: doc.Track,
              car: doc.Car,
            }));

            console.log(lapData);
            res.status(200).json({ message: 'Success', lapData });
          }else {
            // No documents found
            console.error('No user lap data found');
            res.status(200).json({ message: 'No user lap data found' });
          }
        } else {
          // Collection with the matching username not found
          console.error('No user collection found');
          res.status(200).json({ message: 'No user collection found' });
        }
      } else {
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
