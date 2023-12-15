var express = require("express");
var router = express.Router();
var User = require("../models/usermodel");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// POST /create for creating a user
router.post("/create", async (req, res) => {
  const { pseudo, email, mot_de_passe } = req.body;

  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { pseudo, email, mot_de_passe },
    });

    if (!created) {
      return res.status(400).send("Un utilisateur avec cet email existe déjà");
    }

    res.status(201).send("Utilisateur créé avec succès");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la création de l'utilisateur");
  }
});

module.exports = router;
