const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: false,
    },
    id_tipo_convenio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_tipo_convenio",
      autoIncrement: false,
      references: {
        key: "id",
        model: "tipo_convenio_model",
      },
    },
    participantes: {
      type: DataTypes.CHAR,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "participantes",
      autoIncrement: false,
    },
    descripcion: {
      type: DataTypes.CHAR,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "descripcion",
      autoIncrement: false,
    },
    vigencia: {
      type: DataTypes.CHAR,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "vigencia",
      autoIncrement: false,
    },
  };
  const options = {
    tableName: "convenios",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: "public",
  };
  const ConveniosModel = sequelize.define(
    "ConveniosModel",
    attributes,
    options
  );
  return ConveniosModel;
};
