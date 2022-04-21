const Phones = (sequelize, DataTypes) => {
    const phones = sequelize.define("phone", {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        product_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_brand: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return phones
}


module.exports = {Phones}