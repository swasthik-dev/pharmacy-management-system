const express = require('express');
const { PrismaClient } = require('@prisma/client');

const cors = require('cors');

const app = express();
const prisma = new PrismaClient();


app.use(express.json());
app.use(cors());

// List out all medicines in the Medicine Page
app.get('/api/medicines', async(req, res) => {
  try {
    const medicines = await prisma.medicine.findMany();
    console.log('medicines:',medicines)
    res.json(medicines)
  } catch (error) {
    console.error('Error found', error);
    res.status(500).json({error: 'Failed to fetch data'});
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running in port:', PORT)
})