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
  return response.json();
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
  }
  return response.json();
}

// Delete a medicine
export async function deleteMedicine(medicineId) {
  const response = await fetch(`${API_BASE_URL}/medicines/${medicineId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete medicine');
  }
}

// Fetch low stock medicines
export async function fetchLowStockMedicines(threshold = 10) {
  const response = await fetch(`${API_BASE_URL}/medicines/low-stock?threshold=${threshold}`);
  if (!response.ok) {
    throw new Error('Failed to fetch low stock medicines');
  }
  return response.json();
}

// Fetch near-expiry medicines
export async function fetchNearExpiryMedicines(daysUntilExpiry = 30) {
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
  return orders.json
}

