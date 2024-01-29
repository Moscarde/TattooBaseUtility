
// Spinner
const btnEnviar = document.querySelector("#btn-send")
const btnEnviarSpinner = document.querySelector("#btn-send-spinner")

btnEnviar.addEventListener("click", () => {
    btnEnviarSpinner.style.display = "block"
    btnEnviar.style.display = "none"
})



