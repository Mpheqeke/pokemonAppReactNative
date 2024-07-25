import axios from "axios";

const apiconfig = axios.create({
    baseURL: 'http://192.168.1.10:8080', 
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export const fetchPokemonList = async () => {
    try {
        debugger
      const response = await apiconfig.get('/dashboard/landing'); 
      debugger
      return response.data;
    } catch (error) {
        if (error.response) {
          // Server responded with a status code out of the 2xx range
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
        } else if (error.request) {
          // Request was made but no response was received
          console.error('Error request:', error.request);
        } else {
          // Something else caused the error
          console.error('Error message:', error.message);
        }
        throw error;
    }
  };
  
export default apiconfig;