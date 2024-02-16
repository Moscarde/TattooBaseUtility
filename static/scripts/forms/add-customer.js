import { showFlashAlert } from '../flash.js';
import { clearForm } from '../utils.js';
import { searchCustomers } from '../search-customers.js';
// show anaminese
const checkAnaminese = document.querySelector("#anaminese-check")

checkAnaminese.addEventListener("click", () => {
    const anaminese = document.querySelector("#anaminese")
    anaminese.style.display = checkAnaminese.checked ? "block" : "none"
})

// enable input by radio
const anamineseQuestions = document.querySelectorAll(".anaminese-question")

anamineseQuestions.forEach((question) => {
    question.querySelector(".anaminese-radios").addEventListener("click", () => {
        const isChecked = question.querySelector(".radio-true").checked;
        const inputAnaminese = question.querySelector(".conditional-input .input-anaminese");

        inputAnaminese.disabled = !isChecked;
    });
})

const addCustomerForm = document.querySelector("#add-customer__form")
const inputCustomerName = document.querySelector("#add-customer__name")
const inputCustomerPhone = document.querySelector("#add-customer__phone")
const inputCustomerEmail = document.querySelector("#add-customer__email")
const inputCustomerBirth = document.querySelector("#add-customer__birth")
const inputCustomerAddress = document.querySelector("#add-customer__address")
const inputCustomerInstagram = document.querySelector("#add-customer__instagram")
const inputCustomerObservations = document.querySelector("#add-customer__observations")
const addCustomerInputList = [inputCustomerName, inputCustomerPhone, inputCustomerEmail, inputCustomerBirth, inputCustomerAddress, inputCustomerInstagram, inputCustomerObservations]

addCustomerForm.addEventListener("submit", (event) => {
    event.preventDefault()
    addCustomer()
    addCustomerForm.querySelector('button[data-bs-dismiss="modal"]').click()
    clearForm(addCustomerInputList)
    searchCustomers()
})

function addCustomer() {
    const customerFormData = new FormData()

    customerFormData.append("name", inputCustomerName.value)
    customerFormData.append("phone", inputCustomerPhone.value)
    customerFormData.append("email", inputCustomerEmail.value)
    customerFormData.append("birth", inputCustomerBirth.value)
    customerFormData.append("address", inputCustomerAddress.value)
    customerFormData.append("instagram", inputCustomerInstagram.value)
    customerFormData.append("observations", inputCustomerObservations.value)
    
    const options = {
        method: "POST",
        body: customerFormData
    }

    fetch("/customers/add_customer", options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            showFlashAlert(data.message, data.type)
        })
        .catch(error => console.error("Error:", error))
}

