//----------------------- sécuriser la validation des champs remplis par l'utilisateur pour la creation d'une sauce -----------------------//
const Sauce = require("../models/Sauce");
const Ajv = require("ajv");
const { required } = require("nodemon/lib/config");
const ajv = new Ajv({ allErrors: true });

const sauceSchema = {
  type: "object",
  required: [
    "userId",
    "name",
    "manufacturer",
    "description",
    "mainPepper",
    "heat",
  ],
  properties: {
    userId: { type: "string" },
    name: {
      type: "string",
      pattern: "^([a-zA-Z0-9]).{1,20}$",
    },
    manufacturer: {
      type: "string",
      pattern: "^([a-zA-Z0-9]).{1,20}$",
    },
    description: {
      type: "string",
      pattern: "^([a-zA-Z0-9]).{1,50}$",
    },
    mainPepper: {
      type: "string",
      pattern: "^([a-zA-Z0-9]).{1,15}$",
    },
    imageUrl: {
      type: "string",
      pattern: "^([a-zA-Z0-9]).{5,}$",
    },
    heat: { type: "number" },
    likes: { type: "number" },
    dislikes: { type: "number" },
    usersLiked: { type: ["string"] },
    usersDisliked: { type: ["string"] },
  },

  additionalProperties: false,
};

const validate = ajv.compile(sauceSchema);

module.exports = (req, res, next) => {
  if (req.body.sauce) {
    const sauceObject = {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    };
    const valid = validate(sauceObject);
    if (!valid) {
      res.status(400).json({
        error: "Invalide : l'un des champs est mal rempli",
      });
      console.log(validate.errors);
    } else {
      next();
    }
  } else {
    const valid = validate(req.body);
    if (!valid) {
      res.status(400).json({
        error: "Invalide : l'un des champs est mal rempli",
      });
      console.log(validate.errors);
    } else {
      next();
    }
  }
};
