import { selectedCustomer } from '../search-customers.js';
import { showFlashAlert } from '../flash.js';
import { showCustomerProfile } from '../customer-profile.js';
import { clearForm } from '../utils.js';

const btnEditCustomer = document.querySelector("#btn-edit-customer")

const inputCustomerId = document.querySelector("#edit-customer__id")
const inputCustomerName = document.querySelector("#edit-customer__name")
const inputCustomerPhone = document.querySelector("#edit-customer__phone")
const inputCustomerEmail = document.querySelector("#edit-customer__email")
const inputCustomerBirth = document.querySelector("#edit-customer__birth")
const inputCustomerAddress = document.querySelector("#edit-customer__address")
const inputCustomerInstagram = document.querySelector("#edit-customer__instagram")
const inputCustomerObservations = document.querySelector("#edit-customer__observations")
const editCustomerInputList = [inputCustomerName, inputCustomerPhone, inputCustomerEmail, inputCustomerBirth, inputCustomerAddress, inputCustomerInstagram, inputCustomerObservations]

btnEditCustomer.addEventListener("click", () => {
    inputCustomerId.value = selectedCustomer.id
    inputCustomerName.value = selectedCustomer.name
    inputCustomerPhone.value = selectedCustomer.phone
    inputCustomerEmail.value = selectedCustomer.email
    inputCustomerBirth.value = selectedCustomer.birth
    inputCustomerAddress.value = selectedCustomer.address
    inputCustomerInstagram.value = selectedCustomer.instagram
    inputCustomerObservations.value = selectedCustomer.observations
})

const editCustomerForm = document.querySelector("#edit-customer-form")
editCustomerForm.addEventListener("submit", (event) => {
    event.preventDefault()
    editCustomer()
    editCustomerForm.querySelector('button[data-bs-dismiss="modal"]').click()

})

function editCustomer() {
    var customerFormData = new FormData();

    customerFormData.append("id", inputCustomerId.value)
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
    };

    fetch("/customers/update_customer", options)
        .then(response => response.json())
        .then(data => {
            showFlashAlert(data.message, data.type)
        })
        .catch(error => console.error("Error:", error))


    customerFormData.forEach((value, key) => {
        selectedCustomer[key] = value
    })
    showCustomerProfile(selectedCustomer)

}
