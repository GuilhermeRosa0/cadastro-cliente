const { model, Schema, version } = require("mongoose");

const clientSchema = new Schema(
  {
    gmail: {
      type: String,
    },
    telefone: {
      type: String,
    },
    cpf: {
      type: String,
      unique: true,
      index: true,
    },
    nome: {
      type: String,
    },
    sexo: {
      type: String,
    },
    cep: {
      type: String,
    },
    bairro: {
      type: String,
    },
    numero: {
      type: String,
    },
    complemento: {
      type: String,
    },
    estado: {
      type: String,
    },
    cidade: {
      type: String,
    },
    logradouro: {
    type: String,
    },
  },
  { versionKey: false }
);
module.exports = model("Clientes", clientSchema);
