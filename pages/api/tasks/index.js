import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('taskmanager');

    switch (req.method) {
      case 'GET':
        try {
          const tasks = await db.collection('tasks').find({}).toArray();
          res.status(200).json(tasks);
        } catch (error) {
          console.error('Error retrieving tasks:', error);
          res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
        }
        break;

      case 'POST':
        try {
          const { title } = req.body;
          if (!title) {
            return res.status(400).json({ message: 'Title is required' });
          }
          const newTask = { title };
          const result = await db.collection('tasks').insertOne(newTask);
          res.status(201).json({ _id: result.insertedId, title });
        } catch (error) {
          console.error('Error creating task:', error);
          res.status(500).json({ message: 'Error creating task', error: error.message });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ message: 'Error connecting to the database', error: error.message });
  }
}
