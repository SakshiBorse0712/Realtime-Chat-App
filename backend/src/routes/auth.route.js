import express from "express";
import { signup , login , logout , updateProfile} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// router.get("/signup" , (req,res) => {              this function is written in controller
//     res.send("login endpoint");
// });

router.post("/signup" , signup);

router.post("/login" , login);

router.post("/logout" , logout); // we can you get request , but it is a good practice to use post request

router.put("/update-profile", protectRoute ,updateProfile );  // protectRoute => function allows, the next function only if it is authenticated

// check user is authenticated or not 
router.get("/check", protectRoute , (req,res) => res.status(200).json(req.user));

export default router;
