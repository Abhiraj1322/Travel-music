const express = require("express");
const axios=require("axios")
require("dotenv").config();
const searchLocation=require("./src/mapbox")
const app = express();
const PORT = process.env.PORT || 3000;
const {searchPlaylists}=require("./src/spotify")
// Middleware to handle JSON requests
app.use(express.json());
app.set('view engine','pug')


app.get("/",async(req,res)=>{
  const location=req.query.location
  if(!location){
    return res.render('index', { error: 'Please provide a location' });
  }
  try{
    const locationData=await searchLocation(location)
    
    if(locationData.error){
      return res.status(400).json({error:locationData.error})
    }

    const playlists=await searchPlaylists(location)
  
    return res.render('index', {
      location: location,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      zoom: 12, // Default zoom level
     playlists:playlists
    });
  }
 
  
    catch(error){
      console.error('Error searching location:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
   
  });
  







 // Load API key from .env



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
