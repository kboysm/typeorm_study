import express from "express";
import { User } from "../entity/User";

const test_router = express.Router();

test_router.get("/findall", async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (e) {
    res.send("findall failed");
  }
});

export default test_router;
