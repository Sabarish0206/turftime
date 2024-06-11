import express from "express";
import { addTurf, getTurf, getTurfById } from "../controllers/turf-controller.js";

const turfRouter = express.Router();

turfRouter.post("/",addTurf);
turfRouter.get("/",getTurf);
turfRouter.get("/:id",getTurfById);

export default turfRouter;