//----------------------- configuration protégeant les routes en vérifiant l'authentification avant envoi requêtes -----------------------//

const jwt = require("jsonwebtoken");
const config = require("../config.js");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    req.token = jwt.verify(token, `${config.JWT_TOKEN_SECRET}`);

    if (req.body.userId && req.body.userId !== req.token.userId) {
      throw "UserId non valable !";
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: "Requête non authentifiée !" });
  }
};
