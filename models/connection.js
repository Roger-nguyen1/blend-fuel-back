const mysql = require("mysql");

module.exports = {
  connect: () => {
    const config = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      connectTimeout: 2000,
    };

    const connection = mysql.createConnection(config);

    connection.on("connect", () => {
      console.log("Connexion à la base de données réussie");
    });

    connection.on("error", (err) => {
      console.error("Erreur de connexion à la base de données", err);
    });

    return connection;
  },
};
