module.exports = function(sequelize, DataTypes) {
  var Resort = sequelize.define("Resort", {
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 140] }
    },
    link:{ 
      type: DataTypes.STRING,
    },
    lat:{ 
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    }, 
     lng:{ 
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    drive_time: DataTypes.INTEGER,
    current_day_weather: DataTypes.STRING,
    snowfall: DataTypes.INTEGER,
    snowfall_pred: DataTypes.INTEGER,
  });
  return Resort;
};

