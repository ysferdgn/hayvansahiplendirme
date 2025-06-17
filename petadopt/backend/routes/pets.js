// routes/pets.js
const express = require('express');
const router = express.Router();
const Pet = require('../models/pet');
const verifyToken = require('../middlewares/verifyToken');
const multer = require('multer');
const path = require('path');
const User = require('../models/user');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get user's pets
router.get('/my', verifyToken, async (req, res) => {
  try {
    console.log('User ID from token:', req.user.id);
    console.log('User object from token:', req.user);
    
    // Önce kullanıcının var olup olmadığını kontrol et
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found in database');
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('Found user:', user);
    
    // Kullanıcının ilanlarını bul
    const pets = await Pet.find({ owner: req.user.id });
    console.log('Found pets:', pets);
    console.log('Number of pets found:', pets.length);
    
    if (pets.length === 0) {
      console.log('No pets found for user:', req.user.id);
    }
    
    res.json(pets);
  } catch (err) {
    console.error('Error in /my route:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ 
      message: 'Error fetching user pets',
      error: err.message 
    });
  }
});

// Get all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find().populate('owner', 'name email');
    res.json(pets);
  } catch (err) {
    console.error('Error fetching pets:', err);
    res.status(500).json({ message: 'Error fetching pets' });
  }
});

// Get pet by ID
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('owner', 'name email');
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (err) {
    console.error('Error fetching pet:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(500).json({ message: 'Error fetching pet' });
  }
});

// Create new pet
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { name, type, breed, age, location, description } = req.body;
    const pet = new Pet({
      name,
      type,
      breed,
      age,
      location,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      owner: req.user.id
    });
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    console.error('Error creating pet:', err);
    res.status(500).json({ message: 'Error creating pet' });
  }
});

// Update pet
router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (pet.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { name, type, breed, age, location, description } = req.body;
    pet.name = name || pet.name;
    pet.type = type || pet.type;
    pet.breed = breed || pet.breed;
    pet.age = age || pet.age;
    pet.location = location || pet.location;
    pet.description = description || pet.description;
    
    if (req.file) {
      pet.image = `/uploads/${req.file.filename}`;
    }

    await pet.save();
    res.json(pet);
  } catch (err) {
    console.error('Error updating pet:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(500).json({ message: 'Error updating pet' });
  }
});

// Delete pet
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (pet.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await pet.remove();
    res.json({ message: 'Pet deleted' });
  } catch (err) {
    console.error('Error deleting pet:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(500).json({ message: 'Error deleting pet' });
  }
});

module.exports = router;
