const express = require('express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const app = express();
const port = 3000; // Choose a port

// MongoDB connection URI
const uri = 'mongodb+srv://SaifySheikh:Sharif4565@cluster0.xbgnrhv.mongodb.net/employee';

app.get('/', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    // Access the "candidates" collection
    const db = client.db('employee');
    const candidatesCollection = db.collection('candidates');
    
    // Fetch all candidates
    const candidates = await candidatesCollection.find().toArray();
    
    // Close the MongoDB connection
    client.close();
    
    // Send the candidates data to the client
    res.send(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
