

const Refresh = (sequelize, DataTypes)   => {

  const refresh = sequelize.define("refresh", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
    },
  
    expiry_date: {
      type: DataTypes.DATE,
    },
  })
  return refresh
}

module.exports = {Refresh}