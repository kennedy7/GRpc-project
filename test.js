const client = require("./client");

client.getAllHotels({}, (error, hotels) => {
  if (error) throw error;
  console.log(hotels);
});

//get hotel by location
client.getHotelsByLocation(
  {
    location: "Lagos",
  },
  (error, hotels) => {
    if (error) throw error;
    console.log("Successfully gotten list of hotels in this location");
    console.log(hotels);
  }
);

// Add to fav
client.addFavorite(
  {
    id: 2,
    name: "updated kaduna hotel",
    location: " updated kaduna",
    Image: "Hotel image 2",
    address: "somewhere in kaduna",
    price: "10k per night",
    favorite: true,
  },
  (error, hotels) => {
    if (error) throw error;
    console.log("Successfully Added to favorites");
    console.log(hotels);
  }
);

// remove to fav
client.removeFavorite(
  {
    id: "4",
    name: "ekoo hotel",
    location: "Lagos",
    Image: "Hotel image 4",
    address: "somewhere in Lagos",
    price: "100k per night",
    favorite: false,
  },
  (error, hotels) => {
    if (error) throw error;
    console.log(hotels);
    console.log("Successfully Remove from favorites");
  }
);
