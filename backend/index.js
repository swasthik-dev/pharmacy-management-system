const express = require('express');
const { PrismaClient } = require('@prisma/client');

const cors = require('cors');

const app = express();
const prisma = new PrismaClient();


app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running in port:', PORT)
})