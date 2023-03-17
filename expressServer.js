const client = require("./client");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  client.getAllHotels(null, (err, data) => {
    if (err) console.log(err);
    if (!err) {
      //   console.log(data.hotels);
      res.render("hotels", {
        results: data.hotels,
      });
    }
  });
});

app.post("/location", async (req, res) => {
  const location = req.body.location.toLowerCase();
  console.log(location);
  res.redirect(`/location/${location}`);
});
// });

app.get("/location/:location", async (req, res) => {
  const location = req.params.location;
  await client.getHotelsByLocation({ location }, (err, data) => {
    if (err) console.log(err);
    res.render("LocationSearch", { results: data.hotels });
  });
});

app.get("/Favorites", (req, res) => {
  client.getAllHotels(null, (err, data) => {
    if (err) console.log(err);
    if (!err) {
      console.log(data);

      const favorites = data.hotels.filter(({ favorite }) => favorite == true);
      console.log(favorites);
      res.render("favorites", {
        results: favorites,
      });
    }
  });
});

app.post("/AddFav", (req, res) => {
  const updatedHotel = {
    id: req.body.id,
    name: req.body.name,
    state: req.body.state,
    location: req.body.location,
    address: req.body.address,
    price: req.body.price,
    favorite: true,
  };

  client.addFavorite(updatedHotel, (err, data) => {
    if (err) throw err;
    console.log("Added Fav successfully", data);
    res.redirect("/Favorites");
  });
});

app.post("/RemoveFav", (req, res) => {
  const updatedHotel = {
    id: req.body.id,
    name: req.body.name,
    state: req.body.state,
    location: req.body.location,
    address: req.body.address,
    price: req.body.price,
    favorite: false,
  };
  client.removeFavorite(updatedHotel, (err, data) => {
    if (err) throw err;
    console.log("Hotel removed successfully", data);
    res.redirect("/Favorites");
  });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log("Server running at port %d", PORT);
});
