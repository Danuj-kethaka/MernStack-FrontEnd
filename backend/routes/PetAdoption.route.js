import express from "express"
const router = express.Router();
export default router;
import { protect } from "../middleware/auth.middleware.js";
import { createPetAdoption,getPetAdoption,updatePetAdoption,deletePetAdoption } from "../controllers/PetAdoption.Controller.js";

router.post("/",protect,createPetAdoption);
router.get("/",protect,getPetAdoption);
router.put("/:id",protect,updatePetAdoption);
router.delete("/:id",protect,deletePetAdoption);