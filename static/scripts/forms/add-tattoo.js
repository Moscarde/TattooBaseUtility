addTattooForm = document.querySelector("#add-tattoo-form");

addTattooForm.addEventListener("submit", (event) => {
    event.preventDefault()
    addTattoo()
})

function addTattoo() {
    var radioComission = document.querySelector('input[name="add-tattoo__comission-radio"]:checked').value
    var radioPayment = document.querySelector('input[name="add-tattoo__payment-radio"]:checked').value
    var tattoo_data = {
        "customer_id": selectedCustomer["id"],
        "tattoo_name": document.querySelector("#modal-tattoo-name").value,
        "description": document.querySelector("#modal-tattoo-description").value,
        "price": document.querySelector("#modal-tattoo-price").value,
        "comission": document.querySelector('input[name="add-tattoo__comission-radio"]:checked').value,
        "payment": document.querySelector('input[name="add-tattoo__payment-radio"]:checked').value,
        "date": document.querySelector("#modal-tattoo-date").value,
        "time": document.querySelector("#modal-tattoo-time").value,
        "status": "pending"
    }
    console.log(tattoo_data)

    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tattoo_data)
    };

    fetch("/tattoos/add_tattoo", options)
        .then(response => response.json())
        .then(data => {
            console.log(data)

        })
        .catch(error => console.error("Error:", error))
}

