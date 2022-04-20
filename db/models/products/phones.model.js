const Phones = (sequelize, DataTypes) => {
    const phones = sequelize.define("phone", {
        name:{
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        desc: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
        product_id: {
            type: DataTypes.UUID
        },
        product_type: {
            type: DataTypes.STRING
        },
        product_image: {
            type: DataTypes.STRING
        },
        product_brand: {
            type: DataTypes.STRING
        }
    })
    return phones
}


module.exports = {Phones}