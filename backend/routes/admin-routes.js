import express from "express";
import { addAdmin, adminLogin, getAllAdmin} from "../controllers/admin-controller.js";

const adminRouter = express.Router();

adminRouter.post("/signup",addAdmin);
adminRouter.post("/login",adminLogin);
adminRouter.get("/",getAllAdmin);

export default adminRouter; 