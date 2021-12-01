//----------------------- fichier présentant les routes sauce disponibles, à quel endpoint et leur fonction -----------------------//

const express = require("express");
const router = express.Router();
const saucesCtrl = require("../controllers/sauces");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const checkSauces = require("../middleware/check-sauces");

router.post("/", auth, multer, checkSauces, saucesCtrl.createSauce);
router.put("/:id", auth, multer, checkSauces, saucesCtrl.modifySauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);
router.get("/", auth, saucesCtrl.getAllSauces);
router.get("/:id", auth, saucesCtrl.getOneSauce);

module.exports = router;
