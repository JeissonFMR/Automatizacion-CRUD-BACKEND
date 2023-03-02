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
    id_facultad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_facultad",
      autoIncrement: false,
      references: {
        key: "id",
        model: "facultad_model",
      },
    },
    id_nivel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_nivel",
      autoIncrement: false,
      references: {
        key: "id",
        model: "nivel_model",
      },
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
  };
  const options = {
    tableName: "programa",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: "public",
  };
  const ProgramaModel = sequelize.define("ProgramaModel", attributes, options);
  return ProgramaModel;
};
