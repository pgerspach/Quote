const models = require("../models");

module.exports = function(sequelize, DataTypes) {
  var Friendship = sequelize.define("Friendship", {
    // Giving the Author model a name of type STRING
    uuid_1: {
      type: DataTypes.STRING,
      references: {
        model: "Users",
        key: "id"
      }
    },
    uuid_2: {
      type: DataTypes.STRING,
      references: {
        model: "Users",
        key: "id"
      }
    },
    status: {
      type: DataTypes.INTEGER
    }
  });

  return Friendship;
};
