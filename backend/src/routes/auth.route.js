import express from "express";
import { signup , login , logout } from "../controllers/auth.controller.js";

const router = express.Router();

// router.get("/signup" , (req,res) => {              this function is written in controller
//     res.send("login endpoint");
// });

router.post("/signup" , signup);

router.post("/login" , login);

router.post("/logout" , logout); // we can you get request , but it is a good practice to use post request

export default router;