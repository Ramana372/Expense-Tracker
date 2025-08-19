const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 8099;

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.MONGO_URI || 'mongodb://mongo:27017/mydata';
const client = new MongoClient(uri);
let db;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

async function startServer() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const dbName = uri.split('/').pop();
    db = client.db(dbName);

    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}
startServer();

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Node.js!' });
});

app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

    const usersCollection = db.collection('users');
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({ username, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ username: user.username, id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Transactions (protected routes)
app.get('/api/transactions', authenticateToken, async (req, res) => {
  try {
    const transactions = await db.collection('transactions').find({}).toArray();
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/transactions', authenticateToken, async (req, res) => {
  try {
    const { name, amount, type } = req.body;
    if (!name || !amount || !type) return res.status(400).json({ error: 'All fields required' });

    const result = await db.collection('transactions').insertOne({
      name,
      amount: parseFloat(amount),
      type,
      date: new Date(),
      userId: req.user.id
    });
    res.status(201).json({ message: 'Transaction added', id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Specific routes for expenses/income/savings
app.get('/api/expenses', authenticateToken, async (req, res) => {
  try {
    const expenses = await db.collection('transactions').find({ type: 'expense' }).toArray();
    res.status(200).json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/income', authenticateToken, async (req, res) => {
  try {
    const income = await db.collection('transactions').find({ type: 'income' }).toArray();
    res.status(200).json(income);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/savings', authenticateToken, async (req, res) => {
  try {
    const savings = await db.collection('transactions').find({ type: 'savings' }).toArray();
    res.status(200).json(savings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
