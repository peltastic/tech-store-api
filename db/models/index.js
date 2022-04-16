module.exports.User = (sequelize, DataTypes) =>
  sequelize.define("users", {
    userID: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userRole: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
