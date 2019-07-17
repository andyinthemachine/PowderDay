module.exports = function(sequelize, DataTypes) {
  var Resort = sequelize.define("Resort", {
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    drive_time: DataTypes.INTEGER,
    current_day_weather: DataTypes.STRING,
    snowfall: DataTypes.INTEGER,
    snowfall_pred: DataTypes.INTEGER,
  });
  return Resort;
};
