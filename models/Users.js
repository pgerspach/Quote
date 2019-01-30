const models = require("../models");


module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
      // Giving the Author model a name of type STRING
      id:{
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true
      },
      name: DataTypes.STRING,
      proPic:{
        type:DataTypes.STRING
      },
      coverPic:{
        type:DataTypes.STRING
      },
      numFriends:{
        type:DataTypes.INTEGER,
        default:0
      }
    });
    Users.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Users.hasMany(models.Quotes, {
        onDelete: "cascade"
      });
    };
  
    return Users;
  };