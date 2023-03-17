const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./Hotel.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const hotelsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
let hotels = {
  hotels: [
    {
      id: "1",
      name: "New Ajah Suite",
      state: "Lagos",
      location: "ajah",
      address: "somewhere in Lagos",
      price: "30k per night",
      favorite: false,
    },
    {
      id: "2",
      name: "kaduna hotel",
      state: "Kaduna",
      location: "kaduna town",
      address: "somewhere in kaduna",
      price: "10k per night",
      favorite: false,
    },
    {
      id: "3",
      name: "Abuja hotel",
      state: "Abuja",
      location: "abdul estate",
      address: "somewhere in abdul estate",
      price: "15k per night",
      favorite: false,
    },
    {
      id: "4",
      name: "ekoo hotel",
      state: "Lagos",
      location: "lekki",
      address: "somewhere in Lagos",
      price: "100k per night",
      favorite: true,
    },
    {
      id: "5",
      name: "Abule Suite hotel",
      state: "Lagos",
      location: "iyana-era",
      address: "somewhere in Iyana-era",
      price: "100k per night",
      favorite: true,
    },
    {
      id: "6",
      name: "ekofells hotel",
      state: "Enugu",
      location: "nsukka",
      address: "somewhere in nsukka",
      price: "100k per night",
      favorite: true,
    },
    {
      id: "7",
      name: "PAA hotel",
      state: "Enugu",
      location: "nsukka",
      address: "somewhere in UNN",
      price: "100k per night",
      favorite: true,
    },
    {
      id: "8",
      name: "Kubwa hotel",
      state: "Abuja",
      location: "abdul estate",
      address: "somewhere in kubwa",
      price: "15k per night",
      favorite: false,
    },
    {
      id: "4",
      name: "Orlando hotel",
      state: "Lagos",
      location: "lekki",
      address: "somewhere in Lekki",
      price: "100k per night",
      favorite: false,
    },
  ],
};

server.addService(hotelsProto.HotelsService.service, {
  getAllHotels: (_, callback) => {
    callback(null, hotels);
  },

  getHotelsByLocation: (call, callback) => {
    const hotelsLocation = call.request.location;
    const HotelsList = hotels.hotels.filter(
      ({ location }) => location == hotelsLocation
    );
    if (HotelsList) {
      // console.log("search by location data", HotelsList);
      callback(null, { hotels: HotelsList });
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
    }
  },

  addFavorite: (_, callback) => {
    let existingHotel = hotels.hotels.find((n) => n.id == _.request.id);

    if (existingHotel) {
      existingHotel.name = _.request.name;
      existingHotel.location = _.request.location;
      existingHotel.address = _.request.address;
      existingHotel.price = _.request.price;
      existingHotel.favorite = _.request.favorite;
      callback(null, existingHotel);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
    }
  },

  removeFavorite: (_, callback) => {
    let existingHotel = hotels.hotels.find((n) => n.id == _.request.id);

    if (existingHotel) {
      existingHotel.name = _.request.name;
      existingHotel.location = _.request.location;
      existingHotel.address = _.request.address;
      existingHotel.price = _.request.price;
      existingHotel.favorite = _.request.favorite;
      callback(null, existingHotel);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
    }
  },
});

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log(`Server running at ${port}`);
    server.start();
  }
);
