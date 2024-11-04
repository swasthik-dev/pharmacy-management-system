const API_BASE_URL = 'http://localhost:3000/api';

// Fetching all medicines
export async function fetchMedicines() {
  const response = await fetch(`${API_BASE_URL}/medicines`);
  console.log('Response from API:', response)
  if (!response.ok){
    throw new Error('Failed to fetch');
  }  
  return response.json();
}