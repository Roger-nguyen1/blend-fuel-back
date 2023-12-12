const { Sequelize, DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = new Sequelize("mysql::memory:");

class User extends Model {}

User.init(
  {
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    mot_de_passe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_inscription: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt();
        user.mot_de_passe = await bcrypt.hash(user.mot_de_passe, salt);
      },
    },
    sequelize,
    modelName: "User",
  }
);

// Dans votre route Express pour créer un nouvel utilisateur
// app.post("/users", async (req, res) => {
//   try {
//     const newUser = await User.create(req.body);
//     res.json(newUser);
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .json({
//         message:
//           "Une erreur est survenue lors de la création de l'utilisateur.",
//       });
//   }
// });
