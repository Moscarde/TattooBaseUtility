let addTattooForm = document.querySelector("#add-tattoo__form");

addTattooForm.addEventListener("submit", (event) => {
    event.preventDefault()
    addTattoo()
})

function addTattoo() {
    var tattoo_data = {
        "customer_id": selectedCustomer["id"],
        "tattoo_name": document.querySelector("#add-tattoo__name").value,
        "description": document.querySelector("#add-tattoo__description").value,
        "price": document.querySelector("#add-tattoo__price").value,
        "comission": document.querySelector('input[name="add-tattoo__radio-comission"]:checked').value,
        "payment": document.querySelector('input[name="add-tattoo__radio-payment"]:checked').value,
        "date": document.querySelector("#add-tattoo__date").value,
        "time": document.querySelector("#add-tattoo__time").value
    }
    

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

