const { Sequelize, DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

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

module.exports = User;
