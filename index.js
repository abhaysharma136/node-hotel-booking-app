import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { hotelRouter } from "./routes/hotels.js";
import { userRouter } from "./routes/user.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const PORT = 4000;

const Mongo_URL = process.env.Mongo_URL;

async function createConnection() {
  const client = new MongoClient(Mongo_URL);
  await client.connect();
  console.log("Mongo is connected 👍");
  return client;
}

export const client = await createConnection();
// const hotels = [
//   {
//     id: "1",
//     name: "Taj Hotel",
//     city: "Mumbai",
//     hotelType: "5 star",
//     pricePerRoomPernight: "100000",
//     image:
//       "https://navbharattimes.indiatimes.com/thumb/95857952/facts-about-taj-hotel-mumbai-you-probably-didnt-know-about-95857952.jpg?imgsize=175834&width=1200&height=900&resizemode=75",
//     phonenumber: "9989649278",
//   },
//   {
//     id: "2",
//     name: "The Oberoi Rajvilas, Jaipur",
//     city: "Jaipur",
//     hotelType: "4 star",
//     pricePerRoomPernight: "50000",
//     image:
//       "https://cf.bstatic.com/xdata/images/hotel/max500/48356404.jpg?k=94a7dba4725f4284d857358a3aa6bea0e3b3d342e52fa60ae761e44ea35c5074&o=&hp=1",
//   },
//   {
//     id: "3",
//     name: " Taj Resort & Convention Centre, Goa",
//     city: "Goa",
//     hotelType: "4 star",
//     pricePerRoomPernight: "18000",
//     image:
//       "https://media-cdn.tripadvisor.com/media/photo-s/1c/9e/a3/b4/roof-top-infinity-pool.jpg",
//   },
//   {
//     id: "4",
//     name: "Goldfinch Hotel Mumbai",
//     city: "Mumbai",
//     hotelType: "3 star",
//     pricePerRoomPernight: "5999",
//     image:
//       "https://media-cdn.tripadvisor.com/media/photo-s/1d/02/e3/1c/goldfinch-mumbai.jpg",
//   },
//   {
//     id: "5",
//     name: "Roseate House",
//     city: "Delhi",
//     hotelType: "4 star",
//     pricePerRoomPernight: "12500",
//     image:
//       "https://media-cdn.tripadvisor.com/media/photo-s/28/67/da/5a/pres-suite-bathroom-opt.jpg",
//   },
//   {
//     id: "6",
//     name: " Hotel Lakend",
//     city: "udaipur",
//     hotelType: "4 star",
//     pricePerRoomPernight: "95000",
//     image:
//       "https://media-cdn.tripadvisor.com/media/photo-s/11/28/2e/21/hotel-lakend.jpg",
//   },
//   {
//     id: "7",
//     name: "Country Inn & Suites by Radisson Zirakpur",
//     city: "zirakpur",
//     hotelType: "3 star",
//     pricePerRoomPernight: "7000",
//     image:
//       "https://media-cdn.tripadvisor.com/media/photo-s/1d/e9/ec/25/hotel-entrance.jpg",
//   },
//   {
//     id: "8",
//     name: "The Leaf Munnar",
//     city: "Hydrabad",
//     hotelType: "3 star",
//     pricePerRoomPernight: "6400",
//     image:
//       "https://media-cdn.tripadvisor.com/media/photo-s/1d/5a/bf/58/the-leaf-munnar.jpg",
//   },
//   {
//     id: "9",
//     name: "Great Trails Kodaikanal By GRT Hotels",
//     city: "Udaipur",
//     hotelType: "4 star",
//     pricePerRoomPernight: "12116",
//     image:
//       "https://media-cdn.tripadvisor.com/media/photo-s/0d/5c/46/c5/night-view-from-opps.jpg",
//   },
//   {
//     id: "10",
//     name: "Grand Chennai By GRT Hotels",
//     city: "Chennai",
//     hotelType: "4 star",
//     pricePerRoomPernight: "6495",
//     image:
//       "https://media-cdn.tripadvisor.com/media/photo-s/0d/b1/35/26/img-20161121-135234-largejpg.jpg",
//   },
//   {
//     id: "11",
//     name: "Bella Vista Resort",
//     city: "Jaipue",
//     hotelType: "5 star",
//     pricePerRoomPernight: "55000",
//     image:
//       "https://media-cdn.tripadvisor.com/media/photo-s/05/79/73/ec/bella-vista-resort.jpg",
//   },
// ];

app.get("/", function (req, res) {
  res.send("Hello World!!!!");
});

app.use("/hotels", hotelRouter);
app.use("/users", userRouter);
app.listen(PORT, () => console.log(`App is started in ${PORT}`));
