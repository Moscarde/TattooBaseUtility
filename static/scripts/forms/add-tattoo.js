import { currentCustomer, storedSearch } from '../search-customers.js';
import { filePreviews } from './image-upload.js';
import { showFlashAlert } from '../flash.js';
import { appendFormImages, clearForm, updateCustomerTattoos } from '../utils.js';

const addTattooForm = document.querySelector("#add-tattoo__form");

const inputCustomerId = document.querySelector("#add-tattoo__customer-id");
const inputTattooName = document.querySelector("#add-tattoo__name");
const inputTattooDescription = document.querySelector("#add-tattoo__description");
const inputTattooPrice = document.querySelector("#add-tattoo__price");
const inputTattooDate = document.querySelector("#add-tattoo__date");
const inputTattooTime = document.querySelector("#add-tattoo__time");

const radioComission = document.querySelectorAll('input[name="add-tattoo__radio-comission"]');
const radioPayment = document.querySelectorAll('input[name="add-tattoo__radio-payment"]');

const addTattooInputList = [inputTattooName, inputTattooDescription, inputTattooPrice, inputTattooDate, inputTattooTime];
const addTattoosRadiosList = [radioComission, radioPayment];

addTattooForm.addEventListener("submit", (event) => {
    event.preventDefault()
    addTattoo()
    addTattooForm.querySelector('button[data-bs-dismiss="modal"]').click()
    clearForm(addTattooInputList, addTattoosRadiosList)
    updateCustomerTattoos()
})

function addTattoo() {
    let tattooFormData = new FormData();

    tattooFormData.append("customer_id", inputCustomerId.value)
    tattooFormData.append("name", inputTattooName.value)
    tattooFormData.append("description", inputTattooDescription.value)
    tattooFormData.append("price", inputTattooPrice.value)
    tattooFormData.append("date", inputTattooDate.value);
    tattooFormData.append("time", inputTattooTime.value);
    
    radioComission.forEach((radio) => {
        if (radio.checked) {
            tattooFormData.append("comission", radio.value)
        }
    })
    radioPayment.forEach((radio) => {
        if (radio.checked) {
            tattooFormData.append("payment", radio.value)
        }
    })

    tattooFormData = appendFormImages(tattooFormData, filePreviews)

    const options = {
        method: "POST",
        body: tattooFormData
    };

    fetch("/tattoos/add_tattoo", options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            showFlashAlert(data.message, data.type)

        })
        .catch(error => console.error("Error:", error))
}

const inputCustomerName = document.querySelector("#add-tattoo__customer-name")
const customersResultBox = document.querySelector("#add-tattoo__customers-result")
const hiddenCustomerId = document.querySelector("#add-tattoo__customer-id")

inputCustomerName.addEventListener("keyup", () => {
    let result = []
    let input = inputCustomerName.value
    hiddenCustomerId.value = ""


    if (input != "") {
        result = storedSearch.filter(customer => {
            return customer.name.toLowerCase().includes(input.toLowerCase())
        })
        console.log(result)
    } else {
        customersResultBox.innerHTML = ""
    }

    if (result.length > 0) {
        customersResultBox.innerHTML = "<ul> </ul>"
        for (let customer of result) {
            const customerResultItem = document.createElement("li")
            customerResultItem.innerHTML = customer.name
            customerResultItem.setAttribute("data-id", customer.id)
            customerResultItem.setAttribute("tabindex", 0)
            customerResultItem.addEventListener("click", () => {
                selectCustomer(customer)
            })
            customerResultItem.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    selectCustomer(customer)
                }
            })
            customersResultBox.querySelector("ul").appendChild(customerResultItem)

            // customersResultBox.querySelector("ul").innerHTML += `
            //     <li id="customer-result" data-id="${customer.id}">${customer.name}</li>
            // `
        }
        validCustomer(true)
    } else {
        validCustomer()
        customersResultBox.innerHTML = ""
    }
})


function selectCustomer(customer) {
    inputCustomerName.value = customer.name
    customersResultBox.innerHTML = ""
    hiddenCustomerId.value = customer.id
    validCustomer(true)
    console.log(customer)
    currentCustomer = customer
}

function validCustomer(click = false) {
    if (inputCustomerName.value.length > 0) {
        console.log("invalid")
        inputCustomerName.classList.add("is-invalid")
    } else {
        console.log("valid")
        inputCustomerName.classList.remove("is-invalid")
    }
    if (click) {
        inputCustomerName.classList.remove("is-invalid")
    }
}

