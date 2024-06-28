import express from "express";
import { addTurf, getAllTurf, getTurfById } from "../controllers/turf-controller.js";

const turfRouter = express.Router();

turfRouter.post("/",addTurf);
turfRouter.get("/",getAllTurf);
turfRouter.get("/:id",getTurfById);

export default turfRouter;