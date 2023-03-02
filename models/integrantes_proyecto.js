const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
    id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_proyecto",
      autoIncrement: false,
      references: {
        key: "id",
        model: "proyectos_model",
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
    id_tipo_integrantes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_tipo_integrantes",
      autoIncrement: false,
      references: {
        key: "id",
        model: "tipo_integrante_model",
      },
    },
    id_linea_investigacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_linea_investigacion",
      autoIncrement: false,
      references: {
        key: "id",
        model: "linea_investigacion_model",
      },
    },
    es_principal: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "es_principal",
      autoIncrement: false,
    },
  };
  const options = {
    tableName: "integrantes_proyecto",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: "public",
  };
  const IntegrantesProyectoModel = sequelize.define(
    "IntegrantesProyectoModel",
    attributes,
    options
  );
  return IntegrantesProyectoModel;
};
