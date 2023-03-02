const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: false,
    },
    id_categoria_inves: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_categoria_inves",
      autoIncrement: false,
      references: {
        key: "id",
        model: "convocatoria_investigador_model",
      },
    },
    id_integrantes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_integrantes",
      autoIncrement: false,
      references: {
        key: "id",
        model: "integrante_model",
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
    tableName: "cat_convo_minciencias",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: "public",
  };
  const CatConvoMincienciasModel = sequelize.define(
    "CatConvoMincienciasModel",
    attributes,
    options
  );
  return CatConvoMincienciasModel;
};
