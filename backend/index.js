const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// List all medicine
app.get('/api/medicines', async (req, res) => {
  try{
    const allmedicines = await prisma.medicine.findMany()
    console.log('All medicines:', allmedicines)
    res.json(allmedicines);
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({ error: 'Failed to fetch medicines' });
  }
})

// List medicines with optional category, medId, and name filter
app.get('/api/medicines', async (req, res) => {
  const { category, medId, name } = req.query; // Read category, medId, and name from query params
  try {
    const filterConditions = {};

    if (category) {
      filterConditions.category = category;
    }
    if (medId) {
      filterConditions.medicineId = parseInt(medId); // Assuming medicineId is an integer
    }
    if (name) {
      filterConditions.name = {
        contains: name, // Partial match for name
        mode: 'insensitive', // Case-insensitive search
      };
    }

    const filteredmedicines = await prisma.medicine.findMany({
      where: filterConditions,
    });

    console.log('Filtered Medicines:', filteredmedicines);
    res.json(filteredmedicines);
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({ error: 'Failed to fetch medicines' });
  }
});

// Adding medicine
app.post('/api/medicines', async (req, res) => {
  const { medicineId, name, description, price, stockQty, expiryDate } = req.body;
  try {
    const newMedicine = await prisma.medicine.create({
      data: {
        medicineId,
        name,
        description,
        price: parseInt(price),
        stockQty:parseInt(stockQty),
        expiryDate: new Date(expiryDate),
      },
    });
    res.status(201).json(newMedicine);
  } catch (error) {
    console.error('Error adding new medicine:', error.message || error);
    res.status(500).json({ error: 'Failed to add medicine' });
  }
});

// Update an existing medicine
app.put('/api/medicines/:medicineId', async (req, res) => {
  const { medicineId } = req.params;
  const { name, description, price, stockQty, expiryDate } = req.body;
  try {
    const updatedMedicine = await prisma.medicine.update({
      where: { medicineId },
      data: {
        name,
        description,
        price: parseFloat(price),
        stockQty: parseInt(stockQty),
        expiryDate: new Date(expiryDate)
      },
    });
    res.json(updatedMedicine);
  } catch (error) {
    console.error('Error updating medicine:', error);
    res.status(500).json({ error: 'Failed to update medicine' });
  }
});

// Delete a medicine
app.delete('/api/medicines/:medicineId', async (req, res) => {
  const { medicineId } = req.params;
  try {
    await prisma.medicine.delete({
      where: { medicineId },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting medicine:', error);
    res.status(500).json({ error: 'Failed to delete medicine' });
  }
});

// Get medicines with low stock
app.get('/api/medicines/low-stock', async (req, res) => {
  const threshold = parseInt(req.query.threshold) || 10;
  try {
    const lowStockMedicines = await prisma.medicine.findMany({
      where: {
        stockQty: { lt: threshold },
      },
    });
    res.json(lowStockMedicines);
  } catch (error) {
    console.error('Error fetching low stock medicines:', error);
    res.status(500).json({ error: 'Failed to fetch low stock medicines' });
  }
});

// Get medicines near expiry
app.get('/api/medicines/near-expiry', async (req, res) => {
  const daysUntilExpiry = parseInt(req.query.days) || 30;
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + daysUntilExpiry);

  try {
    const nearExpiryMedicines = await prisma.medicine.findMany({
      where: {
        expiryDate: { lt: expiryDate },
      },
    });
    res.json(nearExpiryMedicines);
  } catch (error) {
    console.error('Error fetching near-expiry medicines:', error);
    res.status(500).json({ error: 'Failed to fetch near-expiry medicines' });
  }
});

// List all suppliers
app.get('/api/suppliers', async (req, res) => {
  try{
    const allsuppliers = await prisma.supplier.findMany()
    console.log('All suppliers:', allsuppliers)
    res.json(allsuppliers);
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port:', PORT);
});
