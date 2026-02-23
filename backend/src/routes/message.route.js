import express from "express";
import { getAllContacts } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessagesByUserId } from "../controllers/message.controller.js";
import { sendMessage } from "../controllers/message.controller.js";
import { getChatPartners } from "../controllers/message.controller.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

// the middlewares execute in order - so requests get rate-limited first, then authenticated.
// this is actually more efficient since unauthenticated requests get blocked by rate limiting before hitting the auth middleware.
router.use(arcjetProtection , protectRoute);

// Do not change the sequence
router.get("/contacts", getAllContacts);
router.get("/chats" , getChatPartners);
router.get("/:id"  , getMessagesByUserId );
router.post("/send/:id"  , sendMessage );


export default router;