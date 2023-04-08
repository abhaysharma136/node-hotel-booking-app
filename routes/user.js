import express from "express";
import { CreateUser, getUserByName } from "./helper.js";
import bcrypt from "bcrypt";
const router = express.Router();

async function genHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(salt, hashedPassword);
  return hashedPassword;
}

//Creating user data in MongoDB Api
router.post("/signup", async function (req, res) {
  const { email, password } = req.body;
  const userFromDB = await getUserByName(email);
  if (userFromDB) {
    res.status(404).send({ message: "UserName Already Exists" });
  } else {
    const hashedPassword = await genHashedPassword(password);
    console.log(hashedPassword);
    const result = await CreateUser({
      email: email,
      password: hashedPassword,
    });

    res.send(result);
  }
});

//Login user
router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const userFromDb = await getUserByName(email);
  console.log(userFromDb);
  if (!userFromDb) {
    res.status(404).send({ message: "User not found" });
  } else {
    const storedPassword = userFromDb.password;
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);
    console.log(isPasswordMatch);

    if (isPasswordMatch) {
      res.send({ message: "Successfull Login", id: userFromDb._id });
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  }
});
export const userRouter = router;
