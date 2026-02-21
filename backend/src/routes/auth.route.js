import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup" , signup);

// router.get("/signup" , (req,res) => {              this function is written in controller
//     res.send("login endpoint");
// });

router.get("/login" , (req,res) => {
    res.send("login endpoint");
});

router.get("/logout" , (req,res) => {
    res.send("logout endpoint");
});

export default router;