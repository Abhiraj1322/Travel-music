const axios = require('axios');

// Your Mapbox API key (replace with your actual token)
const mapboxApiKey = "pk.eyJ1IjoiYWJoaXJhamQ0IiwiYSI6ImNtOTIwZDRvMDAwcW0ya3B5c3N1enZmM2YifQ.g6IX5Vj8CwVBPEZyz7hENw"
// Function to search for a location using Mapbox Geocoding API
const searchLocation = async (location) => {
  try {
    // Make a request to the Mapbox Geocoding API
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json`,
      {
        params: {
          access_token: mapboxApiKey, // Your Mapbox API key
        },
      }
    );


    const features = response.data.features;
    
    // Check if any results were found
    if (features.length === 0) {
      console.log('Location not found');
      return { error: 'Location not found' };
    }

    
    const [longitude, latitude] = features[0].geometry.coordinates;

    console.log(`Location: ${features[0].properties.place_name}`);
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Return the coordinates
    return { latitude, longitude };
  } catch (error) {
    console.error('Error fetching location data:', error);
    return { error: 'Error fetching location data' };
  }
};

// Example usage of the function
module.exports=searchLocation