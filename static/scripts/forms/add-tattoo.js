import { currentCustomer, storedSearch } from '../search-customers.js';
import { filePreviews } from './image-upload.js';
import { showFlashAlert } from '../flash.js';

const addTattooForm = document.querySelector("#add-tattoo__form");

addTattooForm.addEventListener("submit", (event) => {
    event.preventDefault()
    addTattoo()
    addTattooForm.querySelector('button[data-bs-dismiss="modal"]').click()
    clearForm()
})

function addTattoo() {
    const tattooFormData = new FormData();

    tattooFormData.append("customer_id", document.querySelector("#add-tattoo__customer-id").value)
    tattooFormData.append("name", document.querySelector("#add-tattoo__name").value)
    tattooFormData.append("description", document.querySelector("#add-tattoo__description").value)
    tattooFormData.append("price", document.querySelector("#add-tattoo__price").value)
    tattooFormData.append("comission", document.querySelector('input[name="add-tattoo__radio-comission"]:checked').value);
    tattooFormData.append("payment", document.querySelector('input[name="add-tattoo__radio-payment"]:checked').value);
    tattooFormData.append("date", document.querySelector("#add-tattoo__date").value);
    tattooFormData.append("time", document.querySelector("#add-tattoo__time").value);


    for (let i = 0; i < filePreviews.length; i++) {
        const base64 = filePreviews[i].split(',')[1];
        const blob = base64toBlob(base64);
        tattooFormData.append("image", blob, `tattoo_image_${i}.png`);
    }



    console.log(tattooFormData)
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

function clearForm() {
    document.querySelector("#add-tattoo__name").value = ""
    document.querySelector("#add-tattoo__description").value = ""
    document.querySelector("#add-tattoo__price").value = ""
    document.querySelector("#add-tattoo__date").value = ""
    document.querySelector("#add-tattoo__time").value = ""
    // document.querySelector("#add-tattoo__radio-comission").checked = true
    // document.querySelector("#add-tattoo__radio-payment").checked = true
    filePreviews.length = 0;

    document.querySelectorAll(".picture__img").forEach(element => {
        element.remove()
    })
}

function base64toBlob(base64) {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: 'image/png' });
}

export { base64toBlob }