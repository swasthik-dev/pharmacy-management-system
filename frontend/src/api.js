const API_BASE_URL = 'http://localhost:3000/api';

// Fetching medicines with optional filters
export async function fetchMedicines({medicineId = "", name = "" } = {}) {
  const query = new URLSearchParams();
  if (medicineId) query.append('medId', medicineId);
  if (name) query.append('name', name);

  const url = `${API_BASE_URL}/medicines?${query.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch medicines');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Add new medicine
export async function addMedicine(medicineData) {
  const response = await fetch(`${API_BASE_URL}/medicines`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicineData)
  });
  console.log('Sending data:', medicineData)
  if (!response.ok) {
    throw new Error('Failed to add new medicine');
  }
  else{
    window.location.reload(); // Reload current page
      setTimeout(() => {
        window.location.assign("/"); // Navigate to medicine page
      }, 1000); // wait for one second to ensure reload happens before nav
  }
}


// Update medicine
export async function updateMedicine(medicineId, medicineData) {
  const response = await fetch(`${API_BASE_URL}/medicines/${medicineId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicineData)
  });
  console.log('Updating data:', medicineData)
  if (!response.ok) {
    throw new Error('Failed to update medicine');
  } else{
      window.location.reload(); // Reload current page
      setTimeout(() => {
        window.location.assign("/"); // Navigate to medicine page
      }, 1000); // wait for one second to ensure reload happens before nav
  }
}

// Delete a medicine
export async function deleteMedicine(medicineId) {
  const response = await fetch(`${API_BASE_URL}/medicines/${medicineId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete medicine');
  } else{
    alert("Medicine deleted successfully!");
    window.location.reload(); // Reload current page
  }
}

// Fetch low stock medicines
export async function fetchLowStockMedicines(threshold = 25) {
  const response = await fetch(`${API_BASE_URL}/medicines/low-stock?threshold=${threshold}`);
  if (!response.ok) {
    throw new Error('Failed to fetch low stock medicines');
  }
  return response.json();
}

// Fetch near-expiry medicines
export async function fetchNearExpiryMedicines(daysUntilExpiry = 45) {
  const response = await fetch(`${API_BASE_URL}/medicines/near-expiry?days=${daysUntilExpiry}`);
  if (!response.ok) {
    throw new Error('Failed to fetch near-expiry medicines');
  }
  return response.json();
}

//Fetch Suppliers
export async function fetchSuppliers() {
  const response = await fetch(`${API_BASE_URL}/suppliers`);
  console.log('Response from API:', response)
  if (!response.ok){
    throw new Error('Failed to fetch suppliers');
  }  
  return response.json();
}

// Posting order to database
export async function placeOrders(orderData) {
  const orders = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(orderData)
  });
  console.log('Placing order:', orderData)
  if (!orders.ok) {
    throw new Error('Failed to place order');
  }
  return orders.json();
}


// Saving to order details
export async function saveOrderDetails(orderdetails) {
  const orderdetail = await fetch(`${API_BASE_URL}/orderdetails`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(orderdetails)
  });
  console.log('Saving order details:', orderdetails)
  if (!orderdetail.ok) {
    throw new Error('Failed to save order details');
  }
  return orderdetail.json();
}


// Displaying Order and Status
export async function getOrderStatus() {
  try {    
    const response = await fetch(`${API_BASE_URL}/orders/status`);
    if (!response.ok) {
      throw new Error('Failed to fetch order status');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Fetch customer by phone number
export async function fetchCustomerByPhone(phoneNumber) {
  const response = await fetch(`${API_BASE_URL}/customers/phone/${phoneNumber}`);
  if (response.ok) {
    return response.json(); // Return customer data if found
  }
  return null; // Return null if customer not found
}

// Create a new customer
export async function createNewCustomer(customerData) {
  const response = await fetch(`${API_BASE_URL}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customerData),
  });

  if (response.ok) {
    return response.json(); // Return newly created customer data
  }

  return null; // Return null if customer creation failed
}


// Fetch customers data
export async function fetchCustomers() {
  const response = await fetch(`${API_BASE_URL}/customers`);
  if (!response.ok) {
    throw new Error('Failed to fetch customers');
  }
  return response.json();
}

// Filter by customer phone number
export async function searchCustomerByPhone(phoneNumber) {
  try {
    const fetchedCustomer = await fetch(`${API_BASE_URL}/customers/${phoneNumber}`);
    if (fetchedCustomer.ok){
      return await fetchedCustomer.json();
    }else{
      throw new Error("Failed to search customer");
    }
  } catch (error) {
    console.error("Error fetching customer:", error);
  }
}