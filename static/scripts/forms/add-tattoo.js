let addTattooForm = document.querySelector("#add-tattoo__form");

addTattooForm.addEventListener("submit", (event) => {
    event.preventDefault()
    addTattoo()
    addTattooForm.querySelector('button[data-bs-dismiss="modal"]').click()
    clearForm()
})

function addTattoo() {
    var tattooFormData = new FormData();

    tattooFormData.append("customer_id", selectedCustomer["id"])
    tattooFormData.append("name", document.querySelector("#add-tattoo__name").value)
    // var inputImage = document.querySelector("#add-tattoo__input-image");
    // for (var i = 0; i < inputImage.files.length; i++) {
    //     tattooFormData.append("image", inputImage.files[i]);
    // }
    tattooFormData.append("description", document.querySelector("#add-tattoo__description").value)
    tattooFormData.append("price", document.querySelector("#add-tattoo__price").value)
    tattooFormData.append("comission", document.querySelector('input[name="add-tattoo__radio-comission"]:checked').value);
    tattooFormData.append("payment", document.querySelector('input[name="add-tattoo__radio-payment"]:checked').value);
    tattooFormData.append("date", document.querySelector("#add-tattoo__date").value);
    tattooFormData.append("time", document.querySelector("#add-tattoo__time").value);

    // Adiciona as imagens do filePreviews ao FormData
    // for (const imageSrc of filePreviews) {
    for (let i = 0; i < filePreviews.length; i++) {
        const base64 = filePreviews[i].split(',')[1];
        const blob = base64toBlob(base64);
        tattooFormData.append("image", blob, `tattoo_image_${i}.png`);
    }



    console.log(tattooFormData)
    var options = {
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

function clearForm() {
    document.querySelector("#add-tattoo__name").value = ""
    document.querySelector("#add-tattoo__description").value = ""
    document.querySelector("#add-tattoo__price").value = ""
    document.querySelector("#add-tattoo__date").value = ""
    document.querySelector("#add-tattoo__time").value = ""
    // document.querySelector("#add-tattoo__radio-comission").checked = true
    // document.querySelector("#add-tattoo__radio-payment").checked = true
    filePreviews = []
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