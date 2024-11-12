import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class DnaSequence extends Model {
  public id!: number;
  public sequence!: string;
  public isMutant!: boolean;
}

DnaSequence.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    sequence: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "sequence",
    },
    isMutant: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: "is_mutant",
    },
  },
  {
    sequelize,
    modelName: "DnaSequence",
    tableName: "dna_sequence",
    timestamps: false,
  }
);

export default DnaSequence;
