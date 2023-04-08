import express from "express";
import {
  CreateHotels,
  GetAllHotels,
  GetHotelById,
  DeleteHotelById,
  UpdateHotelById,
  HotelByAvailablity,
  UpdateHotelBooking,
  HotelBookings,
} from "./helper.js";

const router = express.Router();
//Creating hotel data in MongoDB Api
router.post("/", async function (req, res) {
  const data = req.body;
  console.log(data);
  const result = await CreateHotels(data);

  res.send(result);
});

//Get hotels data in MongoDB Api

router.get("/", async function (req, res) {
  const hotels = await GetAllHotels();
  console.log(hotels);
  res.send(hotels);
});

//Get hotel data from database Api
router.get("/:id", async function (req, res) {
  const { id } = req.params;
  console.log(req.params, id);

  const hotel = await GetHotelById(id);
  console.log(hotel);
  hotel ? res.send(hotel) : res.status(404).send({ msg: "hotel not found" });
});

//Delete a hotel data by Id

router.delete(`/:id`, async function (req, res) {
  const { id } = req.params;
  console.log(req.params, id);
  const result = await DeleteHotelById(id);
  console.log(result);
  result.deletedCount > 0
    ? res.send({ msg: "Movie Succesfully deleted" })
    : res.status(404).send({ msg: "Movie not found" });
});

// Update hotel data by ID

router.put(`/:id`, async function (req, res) {
  const { id } = req.params;
  console.log(req.params, id);
  const data = req.body;
  const result = await UpdateHotelById(id, data);
  res.send(result);
});

//Add new booking to the hotels
router.put(`/booking/:id`, async function (req, res) {
  const { id } = req.params;
  console.log(req.params, id);
  const data = req.body;
  const result = await UpdateHotelBooking(id, data);
  res.send(result);
});

//Get hotels data by checking the status
router.post("/checkAvailablity", async function (req, res) {
  const { checkin } = req.body;
  console.log(checkin);
  const availableHotel = await HotelByAvailablity(checkin);
  res.send(availableHotel);
});

router.post("/bookingDetails", async function (req, res) {
  const { userId } = req.body;
  console.log(userId);
  const bookedHotels = await HotelBookings(userId);
  res.send(bookedHotels);
});

export const hotelRouter = router;
