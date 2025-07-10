/**
 * Módulo de conexão com o banco de dados
 * Uso do framework mongoose
 */

// importação do mongoose
const mongoose = require("mongoose");
//NAO ESQUECER DE NSTALAR O MODULO!!!!!!!!!!
//(npm i mongoose)

// configuração do banco de dados
// ip/link do servidor, autenticação
// ao final da url definir o nome do banco de dados
// exemplo: /dbclientes
const url =
  "mongodb+srv://admin:123Senac@hamburgueria.35fdg.mongodb.net/Cadastro";

// validação (evitar a abertura de várias conexões)
let conectado = false;

// método para conectar com o banco de dados
const conectar = async () => {
  // se não estiver conectado
  if (!conectado) {
    //conectar com o banco de dados
    try {
      await mongoose.connect(url); //conectar
      conectado = true; //setar a variável
      console.log("MongoDB conectado");
    } catch (error) {
      //tratamento de exceções especificas
      console.log(error);
    }
  }
};

const disconnect = async () => {
  // se estiver conectado
  if (conectado) {
    try {
      await mongoose.disconnect(url);
      conectado = false; 
      console.log("MongoDB desconectado");
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = { conectar, disconnect };
