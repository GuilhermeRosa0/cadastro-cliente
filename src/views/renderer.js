function CurrentDate() {
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("pt-BR", options);
}
document.getElementById("CurrentDate").innerHTML = CurrentDate();

api.dbStatus((event, message) => {
  if (message === "connected") {
    document.getElementById("iconDB").src = "../public/img/dbon.png";
  } else {
    document.getElementById("iconDB").src = "../public/img/dboff.png";
  }
});

function profileWindow() {
  api.openClient();
}
