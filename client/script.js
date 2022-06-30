import { Loader } from "@googlemaps/js-api-loader"

const loader = new Loader({
    apiKey: "YOUR_API_KEY",
    version: "weekly",
    ...additionalOptions,
  });
  
  loader.load().then(() => {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  });

export default Script

// // import styles from './stylesheets/styles.css';

// function initGoogle() {
//     const location = {
//         lat: -34.397,
//         lng: 150.644
//     }
//     const options = {
//         // center takes in long and lat (location), these are only 2 required options
//         center: location,
//         zoom: 9
//     }
//     //creating the map itself from div and object options with information
//     map = new google.maps.Map(document.getElementById("map", options))
// }