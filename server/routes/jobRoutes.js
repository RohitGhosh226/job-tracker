import express from "express";
import {getJob,getJobs,createJob,updateJob,deleteJob} from "../controllers/jobController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",protect,getJobs);
router.get("/:id",protect,getJob);
router.post("/",protect, createJob);
router.put("/:id",protect,updateJob);
router.delete("/:id",protect,deleteJob);

export default router;