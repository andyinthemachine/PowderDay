module.exports = function(sequelize, DataTypes) {
  var Resort = sequelize.define("Resort", {
    name: DataTypes.STRING,
    rank: DataTypes.STRING
  });
  return Resort;
};
