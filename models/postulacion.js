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
    id_proyectos: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_proyectos",
      autoIncrement: false,
      references: {
        key: "id",
        model: "proyectos_model",
      },
    },
    id_convocatoria: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_convocatoria",
      autoIncrement: false,
      references: {
        key: "id",
        model: "convocatoria_model",
      },
    },
    fecha_postulacion: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "fecha_postulacion",
      autoIncrement: false,
    },
  };
  const options = {
    tableName: "postulacion",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: "public",
  };
  const PostulacionModel = sequelize.define(
    "PostulacionModel",
    attributes,
    options
  );
  return PostulacionModel;
};
