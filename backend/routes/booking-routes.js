import express from "express";
import { deleteBookingById, getAllBooking, newBooking } from "../controllers/booking-controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/",newBooking);
bookingRouter.get("/",getAllBooking);
bookingRouter.delete("/:id",deleteBookingById);

export default bookingRouter;
