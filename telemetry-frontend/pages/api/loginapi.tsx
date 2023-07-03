import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, MongoClientOptions } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://MaxByng-Maddick:Kismetuni66@cluster0.a31ajbo.mongodb.net/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { username, password } = req.query;

    try {
      // Connect to the MongoDB cluster
      const client = await MongoClient.connect(MONGODB_URI, {
        useUnifiedTopology: true,
      } as MongoClientOptions);

      // Access the database and collection
      const db = client.db('Test');
      const collection = db.collection('Users');

      // Search for a document with the matching username
      const usernameQuery = { username };
      const usernameResult = await collection.findOne(usernameQuery);

      if (usernameResult) {
        // User with the matching username found
        // Now check if the password matches
        if (usernameResult.password === password) {
          // Password matches
          console.log("logged in")
          res.status(200).json({ message: 'Success' });
        } else {
          // Password doesn't match
          res.status(200).json({ message: 'Invalid password' });
        }
      } else {
        // User with the matching username not found
        console.error('User not found');
        res.status(200).json({ message: 'User not found' });
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
