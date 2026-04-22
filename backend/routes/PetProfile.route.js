import express from "express"
const router = express.Router();
export default router;
import {createPetProfile,getPetProfile, updatePetProfile,deletePetProfile} from "../controllers/Petprofile.Controller.js";
import { protect } from "../middleware/auth.middleware.js";

router.post("/",protect,createPetProfile);
router.get("/",protect,getPetProfile);
router.put("/:id",updatePetProfile);
router.delete("/:id",protect,deletePetProfile);