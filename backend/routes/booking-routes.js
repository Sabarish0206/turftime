import express from "express";
import { newBooking } from "../controllers/booking-controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/",newBooking);

export default bookingRouter;
