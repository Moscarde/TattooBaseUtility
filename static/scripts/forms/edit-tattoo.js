function showTattooInfos(tattoo) {
    console.log(tattoo)

    document.querySelector("#edit-tattoo__id").value = tattoo.tattoo_id
    document.querySelector("#edit-tattoo__name").value = tattoo.tattoo_name

    for (let i = 0; i < tattoo.images.length; i++) {
        document.querySelector("#edit-tattoo__images").innerHTML += '<img src="../../../static/img/tattoos/' + tattoo.images[i] + '" class="rounded" alt="...">'
    
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
})

function editTattoo() {
    var tattoo_data = {
        "tattoo_id": document.querySelector("#edit-tattoo__id").value,
        "tattoo_name": document.querySelector("#edit-tattoo__name").value,
        "description": document.querySelector("#edit-tattoo__description").value,
        "price": document.querySelector("#edit-tattoo__price").value,
        "comission": document.querySelector('input[name="edit-tattoo__radio-comission"]:checked').value,
        "payment": document.querySelector('input[name="edit-tattoo__radio-payment"]:checked').value,
        "date": document.querySelector("#edit-tattoo__date").value,
        "time": document.querySelector("#edit-tattoo__time").value,
        "status": document.querySelector('input[name="edit-tattoo__radio-status"]:checked').value,
    }


    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tattoo_data)
    };

    console.log(tattoo_data)
    fetch("/tattoos/update_tattoo", options)
        .then(response => response.json())
        .then(data => {
            console.log(data)

        })
        .catch(error => console.error("Error:", error))
    

    
}
// document.querySelector("#edit-tattoo") 