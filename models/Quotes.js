module.exports = function(sequelize, DataTypes) {
  var Quotes = sequelize.define("Quotes", {
    quote_body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    quote_speaker: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    inflection: {
      type: DataTypes.TEXT,
      default: null
    }
  });

  Quotes.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Quotes.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Quotes;
};
