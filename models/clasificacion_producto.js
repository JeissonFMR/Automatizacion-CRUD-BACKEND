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
    id_jcr: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_jcr",
      autoIncrement: false,
      references: {
        key: "id",
        model: "jcr_model",
      },
    },
    id_sjr: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_sjr",
      autoIncrement: false,
      references: {
        key: "id",
        model: "sjr_model",
      },
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_producto",
      autoIncrement: false,
      references: {
        key: "id",
        model: "producto_model",
      },
    },
    publicacion: {
      type: DataTypes.CHAR,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "publicacion",
      autoIncrement: false,
    },
  };
  const options = {
    tableName: "clasificacion_producto",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: "public",
  };
  const ClasificacionProductoModel = sequelize.define(
    "ClasificacionGrupoModel",
    attributes,
    options
  );
  return ClasificacionProductoModel;
};
