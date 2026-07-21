const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/pets', require('./routes/pets'));
app.use('/api/accessories', require('./routes/accessories'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Pawtopia API is running smoothly',
    dbState: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.send('Pawtopia API is running...');
});

// Global Express Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON format in request body' });
  }
  res.status(err.status || 500).json({
    message: err.message || 'An internal server error occurred'
  });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pawtopia';

let cachedDb = null;

const seedDatabase = async () => {
  try {
    const Pet = require('./models/Pet');
    const Accessory = require('./models/Accessory');

    const petCount = await Pet.countDocuments();
    if (petCount === 0) {
      console.log('Seeding initial pets data...');
      const initialPets = [
        { name: 'Sheroo', age: '2 Month', gender: 'Male', category: 'Rescue Dog', image: 'ap1.jpg', description: 'Energetic rescue puppy loves playing fetch and loves children.' },
        { name: 'Hera', age: '4 Month', gender: 'Female', category: 'Rescue Dog', image: 'ap4.jpg', description: 'Sweet female puppy, very quiet and likes to cuddle.' },
        { name: 'Tommy', age: '6 Month', gender: 'Male', category: 'Rescue Dog', image: 'ap5.jpg', description: 'Loyal companion, friendly with other dogs, house-trained.' },
        { name: 'Max', age: '2 Month', gender: 'Male', category: 'Breed Dog', image: 'ap6.jpg', description: 'Purebred German Shepherd pup, highly alert and intelligent.' },
        { name: 'Lucy', age: '4 Month', gender: 'Female', category: 'Breed Dog', image: 'ap7.jpg', description: 'Beautiful Golden Retriever pup, very playful and outgoing.' },
        { name: 'Buddy', age: '6 Month', gender: 'Male', category: 'Breed Dog', image: 'client-bg.jpg', description: 'Friendly Breed pup, vaccinated, loves long walks.' },
        { name: 'Fluffy', age: '2 Month', gender: 'Female', category: 'Rescue Cat', image: 'ap2.jpg', description: 'Fluffy rescue kitten, likes playing with strings and bells.' },
        { name: 'Shadow', age: '4 Month', gender: 'Male', category: 'Rescue Cat', image: 'ap9.jpg', description: 'Calm kitten, enjoys warm spots and gets along with dogs.' },
        { name: 'Ginger', age: '6 Month', gender: 'Male', category: 'Rescue Cat', image: 'ap10.jpg', description: 'Curious tabby cat, loves watching birds from the window.' },
        { name: 'Cleo', age: '2 Month', gender: 'Female', category: 'Breed Cat', image: 'ap3.jpg', description: 'Elegant Persian kitten, pure white coat, very gentle.' },
        { name: 'Milo', age: '4 Month', gender: 'Male', category: 'Breed Cat', image: 'ap11.jpg', description: 'Playful Siamese kitten, vocal and very social.' },
        { name: 'Bella', age: '6 Month', gender: 'Female', category: 'Breed Cat', image: 'ap8.jpg', description: 'Sweet Bengal cat with gorgeous spots, highly active.' }
      ];
      await Pet.insertMany(initialPets);
      console.log('Pets seeded successfully.');
    }

    const accessoryCount = await Accessory.countDocuments();
    if (accessoryCount === 0) {
      console.log('Seeding initial accessories data...');
      const initialAccessories = [
        {
          name: 'Premium Salmon Dry Dog Food',
          price: 45.99,
          description: 'All-natural, high-protein dry dog food formulated with premium salmon and sweet potato for optimal health and a shiny coat.',
          category: 'Food',
          image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&q=80'
        },
        {
          name: 'Interactive Feather Wand Cat Toy',
          price: 12.99,
          description: 'Keep your feline active and entertained with this interactive feather toy featuring an extendable wand and bell.',
          category: 'Toy',
          image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&q=80'
        },
        {
          name: 'Luxury Orthopedic Memory Foam Bed',
          price: 79.99,
          description: 'Give your pet the comfort they deserve with this orthopedic memory foam pet bed, featuring a removable, washable cover.',
          category: 'Beds & Bowls',
          image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?w=500&q=80'
        },
        {
          name: 'Reflective Nylon Dog Harness',
          price: 24.99,
          description: 'Heavy-duty reflective nylon harness designed for maximum comfort and safety during daily walks.',
          category: 'Collars & Leashes',
          image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80'
        },
        {
          name: 'Self-Cleaning Slicker Brush',
          price: 15.49,
          description: 'Easily remove loose hair and tangles from your pet\'s coat with this brush. Cleans itself at the press of a button.',
          category: 'Grooming',
          image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500&q=80'
        },
        {
          name: 'Double Elevated Stainless Steel Bowls',
          price: 34.99,
          description: 'Elevated feeding station with two high-quality rust-resistant stainless steel bowls, promoting better digestive health.',
          category: 'Beds & Bowls',
          image: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=500&q=80'
        }
      ];
      await Accessory.insertMany(initialAccessories);
      console.log('Accessories seeded successfully.');
    }
  } catch (err) {
    console.error('Error seeding database:', err.message);
  }
};

const connectDB = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }
  try {
    cachedDb = await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected Successfully');
    await seedDatabase();
    return cachedDb;
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
};

connectDB();

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';

if (!isVercel) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
