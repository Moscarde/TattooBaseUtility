import { showCustomerProfile } from './customer-profile.js';
import { filePreviews } from './forms/image-upload.js';
import { currentCustomer } from './search-customers.js';

function clearForm(listInputs, radios = null) {
    listInputs.forEach((input) => {
        input.value = ""
    })

    if (radios != null) {
        radios.forEach((radio) => {
            radio[0].checked = true
        })
    }
    filePreviews.length = 0;

    document.querySelectorAll(".picture__img").forEach(element => {
        element.remove()
    })
}

function appendFormImages(formData, filePreviews) {
    for (let i = 0; i < filePreviews.length; i++) {
        const base64 = filePreviews[i].split(',')[1];
        const blob = base64toBlob(base64);
        formData.append("image", blob, `tattoo_image_${i}.png`);
    }
    return formData
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

function updateCustomerTattoos() {
    console.log("updateCustomerTattoos")
    fetch(`/customers/get_customer_by_id?id=${currentCustomer.id}`)
        .then(response => response.json())
        .then(data => {
            showCustomerProfile(data)
        })
        .catch(error => console.error("Error:", error))

}

function sortAscending(list, term) {
    if (term === "name") {
        return list.sort((a, b) => a[term].localeCompare(b[term]));
    } else {
        return list.sort((a, b) => a[term] - b[term]);
    }
}

function sortDescending(list, term) {
    if (term === "name") {
        return list.sort((a, b) => b[term].localeCompare(a[term]));
    } else {
        return list.sort((a, b) => b[term] - a[term]);
    }
}


export { clearForm, appendFormImages, updateCustomerTattoos, sortAscending, sortDescending }