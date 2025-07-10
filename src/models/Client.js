const { model, Schema, version } = require("mongoose");

const clientSchema = new Schema(
  {
    email: {
      type: String,
    },
    celNumber: {
      type: String,
    },
    cpf: {
      type: String,
      unique: true,
      index: true,
    },
    name: {
      type: String,
    },
    gender: {
      type: String,
    },
    zipcode: {
      type: String,
    },
    district: {
      type: String,
    },
    number: {
      type: String,
    },
    complement: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    street: {
    type: String,
    },
  },
  { versionKey: false }
);
module.exports = model("Clientes", clientSchema);
