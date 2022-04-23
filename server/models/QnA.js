import DataTypes from "sequelize";
import sequelize from "./sq.js";
import User from "./User.js";
import Product from "./Product.js";

const QnA = sequelize.define(
  "Category",
  {
    idx: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },

  //Model 옵션 정의
  {
    charset: "utf8",
    collate: "utf8_general_ci",
    tableName: "Category",
    timestamps: false,
    paranoid: true,
  }
);

QnA.associate = () => {
  QnA.hasOne(User, { foreignKey: "writer", sourceKey: "idx" });
  QnA.hasOne(User, { foreignKey: "reader", sourceKey: "idx" });
  QnA.hasone(Product, { foreignKey: "productId", sourceKey: "idx" });
};

export default QnA;
