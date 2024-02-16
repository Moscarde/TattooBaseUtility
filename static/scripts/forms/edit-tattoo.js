import { filePreviews } from './image-upload.js';
import { showFlashAlert } from '../flash.js';
import { appendFormImages, clearForm, updateCustomerTattoos } from '../utils.js';

const inputEditTattooId = document.querySelector("#edit-tattoo__id");
const inputEditTattooName = document.querySelector("#edit-tattoo__name");
const inputEditTattooDescription = document.querySelector("#edit-tattoo__description");
const inputEditTattooPrice = document.querySelector("#edit-tattoo__price");
const inputEditTattooDate = document.querySelector("#edit-tattoo__date");
const inputEditTattooTime = document.querySelector("#edit-tattoo__time");

const radioEditComission = document.querySelectorAll('input[name="edit-tattoo__radio-comission"]');
const radioEditPayment = document.querySelectorAll('input[name="edit-tattoo__radio-payment"]');
const radioEditStatus = document.querySelectorAll('input[name="edit-tattoo__radio-status"]');

const editTattooInputList = [inputEditTattooName, inputEditTattooDescription, inputEditTattooPrice, inputEditTattooDate, inputEditTattooTime];
const editTattoosRadiosList = [radioEditComission, radioEditPayment, radioEditStatus];

const tattooImagesContainer = document.querySelector("#edit-tattoo__images");

function fillTattooInfos(tattoo) {
    filePreviews.length = 0;
    inputEditTattooId.value = tattoo.tattoo_id
    inputEditTattooName.value = tattoo.tattoo_name

    for (let i = 0; i < tattoo.images.length; i++) {
        const img = document.createElement("img");
        img.src = '../../../static/img/tattoos/' + tattoo.images[i];
        img.classList.add("picture__img");

        const listItem = document.createElement("li");
        listItem.classList.add("picture__item");
        listItem.appendChild(img);
        filePreviews.push(tattoo.images[i]);

        listItem.addEventListener("click", () => {
            filePreviews.splice(filePreviews.indexOf(listItem.querySelector("img").src), 1);
            listItem.remove();
        })

        const lastChild = tattooImagesContainer.lastElementChild;
        tattooImagesContainer.insertBefore(listItem, lastChild);

    }

    inputEditTattooDescription.value = tattoo.description
    inputEditTattooPrice.value = tattoo.price
    inputEditTattooDate.value = tattoo.date
    inputEditTattooTime.value = tattoo.time

    for (let i = 0; i < radioEditComission.length; i++) {
        if (radioEditComission[i].value == tattoo.comission) {
            radioEditComission[i].checked = true
            break
        }
    }

    for (let i = 0; i < radioEditPayment.length; i++) {
        if (radioEditPayment[i].value == tattoo.payment) {
            radioEditPayment[i].checked = true
            break
        }
    }

    let radioEditStatus = document.querySelectorAll('input[name="edit-tattoo__radio-status"]')
    for (let i = 0; i < radioEditStatus.length; i++) {
        if (radioEditStatus[i].value == tattoo.status) {
            radioEditStatus[i].checked = true
            break
        }
    }

}

const editTattooForm = document.querySelector("#edit-tattoo__form");

editTattooForm.addEventListener("submit", (event) => {
    event.preventDefault()
    editTattoo()
    editTattooForm.querySelector('button[data-bs-dismiss="modal"]').click()
    clearForm(editTattooInputList, editTattoosRadiosList)
    updateCustomerTattoos()
})

function editTattoo() {
    let tattooFormData = new FormData();

    tattooFormData.append("tattoo_id", inputEditTattooId.value)
    tattooFormData.append("name", inputEditTattooName.value)
    tattooFormData.append("description", inputEditTattooDescription.value)
    tattooFormData.append("price", inputEditTattooPrice.value)
    tattooFormData.append("date", inputEditTattooDate.value);
    tattooFormData.append("time", inputEditTattooTime.value);

    radioEditComission.forEach((radio) => {
        if (radio.checked) {
            tattooFormData.append("comission", radio.value)
        }
    })
    radioEditPayment.forEach((radio) => {
        if (radio.checked) {
            tattooFormData.append("payment", radio.value)
        }
    })
    radioEditStatus.forEach((radio) => {
        if (radio.checked) {
            tattooFormData.append("status", radio.value)
        }
    })

    tattooFormData = appendFormImages(tattooFormData, filePreviews)


    var options = {
        method: "POST",
        body: tattooFormData
    };

    fetch("/tattoos/update_tattoo", options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            showFlashAlert(data.message, data.type)

        })
        .catch(error => console.error("Error:", error))



}

// document.querySelector("#edit-tattoo") 

export { fillTattooInfos }