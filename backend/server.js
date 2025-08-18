const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 8099;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/myData';
const client = new MongoClient(uri);

let db;

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Node.js!' });
});

app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    if (!db) {
      console.error("❌ Database not initialized");
      return res.status(500).json({ error: "Database connection error" });
    }

    const usersCollection = db.collection('users');

    // Check if user exists
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Insert user
    await usersCollection.insertOne({ username, password });
    console.log(`✅ User registered: ${username}`);

    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.error("❌ Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post('/api/login', async (req, res) => {
  console.log("Received body:", req.body);
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).json({ error: "Missing username or password" });
  }

  const { username, password } = req.body;

  try {
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ username, password });
    if (user) {
      res.status(200).json({ message: "Login successful", user: { username: user.username } });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Serve static uploads if needed
app.use('/uploads', express.static('uploads'));

app.get('/api/transactions', async (req, res) => {
  try {
    const transactionsCollection = db.collection('transactions');
    const transactions = await transactionsCollection.find({}).toArray();
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/transactions', async (req, res) => {
  const { name, amount, type } = req.body;
  try {
    const transactionsCollection = db.collection('transactions');
    const result = await transactionsCollection.insertOne({
      name,
      amount: parseFloat(amount),
      type,
      date: new Date()
    });
    res.status(201).json({
      message: "Transaction added successfully",
      id: result.insertedId
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server only after MongoDB connects
async function startServer() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const dbName = uri.split('/').pop();
    db = client.db(dbName);

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Error connecting to MongoDB", err);
    process.exit(1);
  }
}

startServer();
