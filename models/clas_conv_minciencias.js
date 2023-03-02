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
    id_grupo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_grupo",
      autoIncrement: false,
      references: {
        key: "id",
        model: "grupo_model",
      },
    },
    id_clas_grupo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_clas_grupo",
      autoIncrement: false,
      references: {
        key: "id",
        model: "clasificacion_grupo_model",
      },
    },
    anio_conv: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "anio_conv",
      autoIncrement: false,
    },
  };
  const options = {
    tableName: "clas_conv_minciencias",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: "public",
  };
  const ClasConvMincienciasModel = sequelize.define(
    "ClasConvMincienciasModel",
    attributes,
    options
  );
  return ClasConvMincienciasModel;
};
