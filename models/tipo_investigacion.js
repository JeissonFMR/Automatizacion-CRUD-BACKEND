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
    nombre: {
      type: DataTypes.CHAR,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "nombre",
      autoIncrement: false,
    },
    sigla: {
      type: DataTypes.CHAR,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "sigla",
      autoIncrement: false,
    },
  };
  const options = {
    tableName: "tipo_investigacion",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: "public",
  };
  const TipoInvestigacionModel = sequelize.define(
    "TipoInvestigacionModel",
    attributes,
    options
  );
  return TipoInvestigacionModel;
};