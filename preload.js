const { ipcRenderer, contextBridge } = require("electron");
ipcRenderer.send("db-connect");
contextBridge.exposeInMainWorld("api", {
  dbStatus: (message) => ipcRenderer.on("db-status", message),
  openClient: () => ipcRenderer.send("open-client"),
  registerClient: (registerClient) => ipcRenderer.send("register-client", registerClient),
  resetCpf: (args) => ipcRenderer.on("reset-Cpf", args),
  resetForm: (args) => ipcRenderer.on("reset-form", args),
  searchName: (nomeCli) => ipcRenderer.send('search-name', nomeCli),
  renderClient: (client) => ipcRenderer.on('render-client', client),
  validarBusca: () => ipcRenderer.send('validar-busca'),
  setName: (args) => ipcRenderer.on('set-name', args),
  searchCpf: (cpfCli) => ipcRenderer.send('search-cpf', cpfCli),
  renderCpf: (clientCPF) => ipcRenderer.on("render-clientCPF", clientCPF),
  setCpf: (args) => ipcRenderer.on('set-cpf', args),
  deleteClient: (id) => ipcRenderer.send('delete-client', id),
  updateClient: (registerClient) => ipcRenderer.send('edit-client', registerClient)
});
