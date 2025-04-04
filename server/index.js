
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  },
  fileFilter: function(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
});

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory database for development
let products = [];
let nextProductId = 1;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

app.post('/api/products', upload.single('image'), (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    
    const newProduct = {
      id: `p${nextProductId++}`,
      name: productData.name,
      description: productData.description,
      price: parseFloat(productData.price),
      category: productData.category,
      stock: parseInt(productData.stock),
      deliveryOption: productData.deliveryOption,
      sellerId: productData.sellerId || 's5', // Default seller ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add image path if an image was uploaded
    if (req.file) {
      newProduct.image = `/uploads/${req.file.filename}`;
    } else {
      newProduct.image = '/placeholder.svg';
    }
    
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: 'Invalid product data', error: error.message });
  }
});

app.put('/api/products/:id', upload.single('image'), (req, res) => {
  try {
    const productIndex = products.findIndex(p => p.id === req.params.id);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const productData = JSON.parse(req.body.productData);
    const updatedProduct = {
      ...products[productIndex],
      name: productData.name,
      description: productData.description,
      price: parseFloat(productData.price),
      category: productData.category,
      stock: parseInt(productData.stock),
      deliveryOption: productData.deliveryOption,
      updatedAt: new Date().toISOString()
    };
    
    // Update image if a new one was uploaded
    if (req.file) {
      updatedProduct.image = `/uploads/${req.file.filename}`;
    }
    
    products[productIndex] = updatedProduct;
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ message: 'Invalid product data', error: error.message });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  products.splice(productIndex, 1);
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
