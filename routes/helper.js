import { ObjectId } from "mongodb";
import { client } from "../index.js";

//Hotel Api Calls
export async function UpdateHotelById(id, data) {
  return await client
    .db("hotels-db")
    .collection("hotels")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
}

export async function UpdateHotelBooking(id, data) {
  return await client
    .db("hotels-db")
    .collection("hotels")
    .updateOne({ _id: new ObjectId(id) }, { $push: { booking: data } });
}

export async function DeleteHotelById(id) {
  return await client
    .db("hotels-db")
    .collection("hotels")
    .deleteOne({ id: id });
}
export async function GetHotelById(id) {
  return await client
    .db("hotels-db")
    .collection("hotels")
    .findOne({ _id: new ObjectId(id) });
}
export async function GetAllHotels() {
  return await client.db("hotels-db").collection("hotels").find({}).toArray();
}
export async function CreateHotels(data) {
  return await client.db("hotels-db").collection("hotels").insertMany(data);
}

export async function HotelByAvailablity(checkin) {
  return await client
    .db("hotels-db")
    .collection("hotels")
    .find({ "booking.checkin": { $nin: [checkin] } })
    .toArray();
}

export async function HotelBookings(userId) {
  return await client
    .db("hotels-db")
    .collection("hotels")
    .find({ booking: { $elemMatch: { bookingId: userId } } })
    .toArray();
}
//User Api Calls
export async function CreateUser(data) {
  return await client.db("hotels-db").collection("users").insertOne(data);
}

export async function getUserByName(email) {
  return await client
    .db("hotels-db")
    .collection("users")
    .findOne({ email: email });
}
