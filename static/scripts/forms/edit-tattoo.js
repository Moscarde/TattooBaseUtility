import { selectedCustomer } from '../search-customers.js';
import { filePreviews } from './image-upload.js';
import { showFlashAlert } from '../flash.js';
import { base64toBlob } from './add-tattoo.js';

function showTattooInfos(tattoo) {
    console.log(tattoo)
    filePreviews.length = 0;
    document.querySelector("#edit-tattoo__id").value = tattoo.tattoo_id
    document.querySelector("#edit-tattoo__name").value = tattoo.tattoo_name

    const tattooImagesContainer = document.querySelector("#edit-tattoo__images");
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

    document.querySelector("#edit-tattoo__description").value = tattoo.description
    document.querySelector("#edit-tattoo__price").value = tattoo.price
    document.querySelector("#edit-tattoo__date").value = tattoo.date
    document.querySelector("#edit-tattoo__time").value = tattoo.time


    let radiosComission = document.querySelectorAll('input[name="edit-tattoo__radio-comission"]')
    for (let i = 0; i < radiosComission.length; i++) {
        if (radiosComission[i].value == tattoo.comission) {
            radiosComission[i].checked = true
            break
        }
    }


    let radiosPayment = document.querySelectorAll('input[name="edit-tattoo__radio-payment"]')
    for (let i = 0; i < radiosPayment.length; i++) {
        if (radiosPayment[i].value == tattoo.payment) {
            radiosPayment[i].checked = true
            break
        }
    }

    let radiosStatus = document.querySelectorAll('input[name="edit-tattoo__radio-status"]')
    for (let i = 0; i < radiosStatus.length; i++) {
        if (radiosStatus[i].value == tattoo.status) {
            radiosStatus[i].checked = true
            break
        }
    }

}

let editTattooForm = document.querySelector("#edit-tattoo__form");

editTattooForm.addEventListener("submit", (event) => {
    event.preventDefault()
    editTattoo()
    clearEditTattooForm()
    editTattooForm.querySelector('button[data-bs-dismiss="modal"]').click()
})

function editTattoo() {
    var tattooFormData = new FormData();

    tattooFormData.append("tattoo_id", document.querySelector("#edit-tattoo__id").value)
    tattooFormData.append("name", document.querySelector("#edit-tattoo__name").value)

    // var inputImage = document.querySelector("#edit-tattoo__input-image");
    // for (var i = 0; i < inputImage.files.length; i++) {
    //     tattooFormData.append("image", inputImage.files[i]);
    // }
    tattooFormData.append("description", document.querySelector("#edit-tattoo__description").value)
    tattooFormData.append("price", document.querySelector("#edit-tattoo__price").value)
    tattooFormData.append("comission", document.querySelector('input[name="edit-tattoo__radio-comission"]:checked').value);
    tattooFormData.append("payment", document.querySelector('input[name="edit-tattoo__radio-payment"]:checked').value);
    tattooFormData.append("status", document.querySelector('input[name="edit-tattoo__radio-status"]:checked').value)
    tattooFormData.append("date", document.querySelector("#edit-tattoo__date").value);
    tattooFormData.append("time", document.querySelector("#edit-tattoo__time").value);

    for (let i = 0; i < filePreviews.length; i++) {
        if (filePreviews[i].length > 1000) {
            const base64 = filePreviews[i].split(',')[1];
            const blob = base64toBlob(base64);
            tattooFormData.append("image", blob, `tattoo_image_${i}.png`);
        }
        else {
            tattooFormData.append("old_image", filePreviews[i]);
        }
    }

    console.log(tattooFormData)

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

function clearEditTattooForm() {

    document.querySelector("#edit-tattoo__id").value = ""
    document.querySelector("#edit-tattoo__name").value = ""
    document.querySelector("#edit-tattoo__description").value = ""
    document.querySelector("#edit-tattoo__price").value = ""
    document.querySelector("#edit-tattoo__date").value = ""
    document.querySelector("#edit-tattoo__time").value = ""

    document.querySelectorAll(".picture__img").forEach(element => {
        element.remove()
    })
}
// document.querySelector("#edit-tattoo") 

export { showTattooInfos }