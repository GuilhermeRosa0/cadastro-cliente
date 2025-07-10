
let frmProfile = document.getElementById("frmProfile");
let frmSearchClient = document.getElementById("frmSearchClient");
let email = document.getElementById("email");
let celNumber = document.getElementById("celNumber");
let name = document.getElementById("name");
let cpf = document.getElementById("cpf");
let gender = document.getElementById("gender");
let zipcode = document.getElementById("zipcode");
let district = document.getElementById("district");
let number = document.getElementById("number");
let complement = document.getElementById("complement");
let state = document.getElementById("state");
let city = document.getElementById("city");
let street = document.getElementById("street");
let id = document.getElementById("id");
let searchBar = document.getElementById("searchClient");

let arrayClient = [];

document.addEventListener("DOMContentLoaded", () => {
  searchBar.focus();
  btnCreate.disabled = false;
  btnUpdate.disabled = true;
  btnDelete.disabled = true;
});

function resetForm() {
  location.reload();
}

function resetCpf() {
  const focusCpf = document.getElementById("cpf");
  focusCpf.focus();
  focusCpf.value = "";
}

api.resetCpf((args) => {
  resetCpf();
});

api.resetForm((args) => {
  resetForm();
});

function searchAddress() {
  let zipcode = document.getElementById("zipcode").value;
  let urlAPI = `https://viacep.com.br/ws/${zipcode}/json/`;
  fetch(urlAPI)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("street").value = data.logradouro;
      document.getElementById("district").value = data.bairro;
      document.getElementById("city").value = data.localidade;
      document.getElementById("state").value = data.uf;
      document.getElementById("complement").value = data.complemento;
    })
    .catch(error)
}

function validateCpf(cpf) {
  cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false; // Verifica se tem 11 dígitos e se não é uma sequência repetida (ex: 111.111.111-11)
  }

  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i);
  }
  let rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf[9])) return false;

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf[10])) return false;
  return true;
}

// Checar CPF
function testaCPF() {
  let inputCPF = document.getElementById("cpf");
  let CPFAlert = document.getElementById("CPFAlert");
  if (!validateCpf(inputCPF.value)) {
    CPFAlert.style.display = "block"; // Mostra o popup

    cpf.classList.remove("is-valid");
    cpf.classList.add("is-invalid");
  } else {
    CPFAlert.style.display = "none"; // Esconde o popup
    cpf.classList.remove("is-invalid");
    cpf.classList.add("is-valid");
  }
}

//====

//crud create - inicio
frmProfile.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (id.value === "") {
    const registerClient = {
      gmailCli: email.value,
      telCli: celNumber.value,
      cpfCli: cpf.value,
      nomeCli: name.value,
      sexoCli: gender.value,
      cepCli: zipcode.value,
      bairroCli: district.value,
      numCli: number.value,
      compCli: complement.value,
      ufCli: state.value,
      cidCli: city.value,
      lograCli: street.value,
    };
    api.registerClient(registerClient);
  } else {

    //alterar os dados de um cliente existente
    const registerClient = {
      idCli: id.value,
      gmailCli: email.value,
      telCli: celNumber.value,
      cpfCli: cpf.value,
      nomeCli: name.value,
      sexoCli: gender.value,
      cepCli: zipcode.value,
      bairroCli: district.value,
      numCli: number.value,
      compCli: complement.value,
      ufCli: state.value,
      cidCli: city.value,
      lograCli: street.value,


    };
    //mandar o cliente pro birigubeigos

    api.updateClient(registerClient)
  }
});

//crud create - fim

//================================================================================
//======================= MANIPULAÇAO DO BOTAO ENTER =============================
function teclaEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    clientSearch();
  }
}

frmSearchClient.addEventListener("keydown", teclaEnter);


function restaurarEnter() {
  frmSearchClient.removeEventListener("keydown", teclaEnter);
}
//======================= MANIPULAÇAO DO BOTAO ENTER =============================
//================================================================================

//================================================================================
//=========================== CRUD READ- INICIO ==================================

//setar o noem do cliente para fazer um novo cadastro se a vbusca retornar que o cliente deseja cadastras um novo cliente ocm o alert

api.setName((args) => {
  console.log(
    "meu deus meu senhor me ajdua por favor é no trabalaho na esocla ou faukdad"
  );
  // "recortar" o nome da busca e salovar e setar o nome do form

  //focar no campo nome
  name.focus();
  //copiar o nome do cliente para o campo nome
  name.value = searchBar.value;
  //limpar o campo de busca

  searchBar.value = "";
});
//=====================================================================================================================
api.setCpf((args) => {
  console.log(
    "meu deus meu senhor me ajdua por favor é no trabalaho na esocla ou faukdad"
  );
  // "recortar" o nome da busca e salovar e setar o nome do form
  let busca = document.getElementById("searchClient").value;
  //focar no campo nome
  cpf.focus();
  console.log(busca);
  console.log("4")
  let valorBusca = searchBar.value;
  console.log(valorBusca);
  //copiar o nome do cliente para o campo nome
  cpf.value = searchBar.value;
  console.log(valorBusca);
  //limpar o campo de busca

  searchBar.value = "";
});

function clientSearch() {
  const temNumero = /\d+/.test(searchBar.value);
  console.log(`${temNumero} acho que ta certo `);
  if (searchBar.value === "") {
    api.validarBusca();
  } else if (temNumero === true) {
    console.log("teste 123213");
    api.searchCpf(searchBar.value);
    api.renderCpf((event, clientCPF) => {
      console.log("chegou o cpf do cliente aq no renderer dnv");
      console.log(clientCPF);
      const clientDataCPF = JSON.parse(clientCPF);
      arrayClient = clientDataCPF;
      //uso do laço foreach para percorrer o vetor e extrair os dados
      arrayClient.forEach((c) => {
        id.value = c._id;
        name.value = c.nome;
        email.value = c.gmail;
        celNumber.value = c.telefone;
        cpf.value = c.cpf;
        gender.value = c.sexo;
        zipcode.value = c.cep;
        district.value = c.bairro;
        number.value = c.numero;
        complement.value = c.complemento;
        state.value = c.estado;
        city.value = c.cidade;
        street.value = c.logradouro;

        restaurarEnter();
        btnCreate.disabled = true;
        btnDelete.disabled = false;
        btnUpdate.disabled = false;
      });
    });
  } else {
    api.searchName(searchBar.value);
    api.renderClient((event, client) => {

      //passo 6- cobverter os dados de string para json. renderizaçao dos dados para o html
      const clientData = JSON.parse(client);
      arrayClient = clientData;
      //uso do laço foreach para percorrer o vetor e extrair os dados
      arrayClient.forEach((c) => {
        id.value = c._id;
        name.value = c.nome;
        email.value = c.gmail;
        celNumber.value = c.telefone;
        cpf.value = c.cpf;
        gender.value = c.sexo;
        zipcode.value = c.cep;
        district.value = c.bairro;
        number.value = c.numero;
        complement.value = c.complemento;
        state.value = c.estado;
        city.value = c.cidade;
        street.value = c.logradouro;
        restaurarEnter();
        btnCreate.disabled = true;
        btnDelete.disabled = false;
        btnUpdate.disabled = false;
      });
    });
  }
}
//=========================== CRUD READ- FIM =====================================
//================================================================================

//================================================================================
//=========================== CRUD DELETE- FIM ===================================
function removeClient() {
  console.log(id.value)
  //console.log("teste1")
  //recebimento e envio do id para o main
  api.deleteClient(id.value);
}

//=========================== CRUD DELETE- FIM ===================================
//================================================================================

