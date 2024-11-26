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


// Posting the order to database
app.post('/api/orders', async (req, res) => {
  const { orderDate, customerId, totalAmount } = req.body;

  try {
    const order = await prisma.order.create({
      data: {
        orderDate: orderDate,
        customerId: customerId,
        totalAmount: parseFloat(totalAmount),
      },
    });
    //  Return success response with the created order
    res.status(200).json({ message: 'Order Placed Successfully', order});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to place order'});
  }
});

// Fetching customer by Phone number
app.get('/api/customers/phone/:phoneNumber', async (req, res) => {
  const { phoneNumber } = req.params;

  try {
    const customer = await prisma.customer.findUnique({
      where: { contactNumber: phoneNumber },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ error: "Failed to fetch customer" });
  }
});


// Creating new customer
app.post('/api/customers', async (req, res) => {
  const { customerId, name, contactNumber, address, email } = req.body;

  try {
    const newCustomer = await prisma.customer.create({
      data: {
        customerId,
        name,
        contactNumber,
        address,
        email
      },
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Failed to create customer" });
  }
});

// Displaying Order Status
app.get('/api/orders/status', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      select: {
        orderId: true,
        orderDate: true,
        totalAmount: true,
      }
    });

    // Calculate status dynamically
    const enrichedOrders = orders.map(order => {
      const orderDate = new Date(order.orderDate);
      const today = new Date();

      let status;
      if (orderDate > today){
        status = 'Pending';
      } else if (
        orderDate.toDateString() === today.toDateString()
    ){
      status = 'In Progress';
    } else{
      status = 'Completed';
    }
    return { ...order, status };
    });
    
    res.status(200).json(enrichedOrders); 
  } catch (error) {
    console.error("Error fetching order status:", error);
    res.status(500).json({ error: 'Failed to fetch order status' });
  }
})

// Posting detailed data on order to Order_Detail table


// List all medicine
app.get('/api/customers', async (req, res) => {
  try{
    const allmedicines = await prisma.customer.findMany()
    console.log('All medicines:', allmedicines)
    res.json(allmedicines);
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({ error: 'Failed to fetch medicines' });
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port:', PORT);
});

// List all orders(CUSTOMERS)
app.get('/api/orders', async (req, res) => {
  try {
    const allOrders = await prisma.order.findMany();
    res.json(allOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Fetch personal information of a user
app.get('/api/personal/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const personalInfo = await prisma.user.findUnique({
      where: { id: parseInt(userId) }, // Assuming user ID is an integer
    });
    res.json(personalInfo);
  } catch (error) {
    console.error('Error fetching personal info:', error);
    res.status(500).json({ error: 'Failed to fetch personal info' });
  }
});

