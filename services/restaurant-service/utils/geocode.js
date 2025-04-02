import fetch from 'node-fetch';

const geocodeAddress = async (address) => {
  const apiKey = 'AIzaSyB9Xv7NkrOGHxUDdlfo8ecwDahM2xGe87o'; // clé en dur pour test
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Geocoding failed: ${data.status}`);
    }

    const { lat, lng } = data.results[0].geometry.location;
    return { latitude: lat, longitude: lng };
  } catch (error) {
    console.error('Erreur dans geocodeAddress:', error.message);
    throw error;
  }
};

export default geocodeAddress;
