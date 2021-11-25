//----------------------- fichier présentant les routes user disponibles, à quel endpoint et leur fonction -----------------------//

const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const checkInputs = require("../middleware/check-inputs");

router.post("/signup", checkInputs, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
