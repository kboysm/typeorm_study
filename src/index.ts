import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

// CREATE
app.post("/users", async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  try {
    const user = User.create({ name, email, role });
    await user.save();
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
// REAT
app.get("/users", async (_: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
// UPDATE
app.put("/users/:uuid", async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  const { name, email, role } = req.body;
  try {
    const user = await User.findOneOrFail({ uuid });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    await user.save();
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Somethine went wrong" });
  }
});
// DELETE
app.delete("/users/:uuid", async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOneOrFail({ uuid });

    await user.remove();

    return res.json({ msg: "user deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Somethine went wrong" });
  }
});
// FIND
app.get("/users/:uuid", async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOneOrFail({ uuid });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "user not found" });
  }
});

createConnection()
  .then(async (connection) => {
    app.listen(3000, () => {
      console.log("server start");
    });
  })
  .catch((error) => console.log(error));