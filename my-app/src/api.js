// api.js
const API_URL = 'http://127.0.0.1:5000/api';

export const fetchStockData = async (ticker) => {
    const response = await fetch(`${API_URL}/predict/${ticker}`);
    if (!response.ok) {
        // If the response is not OK, throw an error
        const errorData = await response.json();  // Get the error message
        throw new Error(errorData.error || 'Network response was not ok');
    }
    return response.json();
};
