import { selectedCustomer } from '../search-customers.js';
import { showFlashAlert } from '../flash.js';
import { showCustomerProfile } from '../customer-profile.js';

const btnEditCustomer = document.querySelector("#btn-edit-customer")

btnEditCustomer.addEventListener("click", () => {
    document.querySelector("#edit-customer__id").value = selectedCustomer.id
    document.querySelector("#edit-customer__name").value = selectedCustomer.name
    document.querySelector("#edit-customer__phone").value = selectedCustomer.phone
    document.querySelector("#edit-customer__email").value = selectedCustomer.email
    document.querySelector("#edit-customer__birth").value = selectedCustomer.birth
    document.querySelector("#edit-customer__address").value = selectedCustomer.address
    document.querySelector("#edit-customer__instagram").value = selectedCustomer.instagram
    document.querySelector("#edit-customer__observations").value = selectedCustomer.observations
    console.log(selectedCustomer)
})

const editCustomerForm = document.querySelector("#edit-customer-form")
editCustomerForm.addEventListener("submit", (event) => {
    event.preventDefault()
    editCustomer()
    editCustomerForm.querySelector('button[data-bs-dismiss="modal"]').click()

})

function editCustomer() {
    var customerFormData = new FormData();

    customerFormData.append("id", document.querySelector("#edit-customer__id").value)
    customerFormData.append("name", document.querySelector("#edit-customer__name").value)
    customerFormData.append("phone", document.querySelector("#edit-customer__phone").value)
    customerFormData.append("email", document.querySelector("#edit-customer__email").value)
    customerFormData.append("birth", document.querySelector("#edit-customer__birth").value)
    customerFormData.append("address", document.querySelector("#edit-customer__address").value)
    customerFormData.append("instagram", document.querySelector("#edit-customer__instagram").value)
    customerFormData.append("observations", document.querySelector("#edit-customer__observations").value)

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


function updateCustomer(customer) {


}
