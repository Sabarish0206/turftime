import express from "express";
import { addAdmin, adminLogin, getAdminById, getAllAdmin} from "../controllers/admin-controller.js";

const adminRouter = express.Router();

adminRouter.post("/signup",addAdmin);
adminRouter.post("/login",adminLogin);
adminRouter.get("/",getAllAdmin);
adminRouter.get("/:id",getAdminById);

export default adminRouter; 