addTattooForm = document.querySelector("#add-tattoo-form");

addTattooForm.addEventListener("submit", (event) => {
    event.preventDefault()
    addTattoo()
})

function addTattoo() {
    var radioComission = document.querySelector('input[name="add-tattoo__comission-radio"]:checked').value
    var radioPayment = document.querySelector('input[name="add-tattoo__payment-radio"]:checked').value
    var tattoo = {
        "customer_id": selectedCustomer["id"],
        "tattoo_name": document.querySelector("#modal-tattoo-name").value,
        "description": document.querySelector("#modal-tattoo-description").value,
        "price": document.querySelector("#modal-tattoo-price").value,
        "comission": document.querySelector('input[name="add-tattoo__comission-radio"]:checked').value,
        "payment": document.querySelector('input[name="add-tattoo__payment-radio"]:checked').value,
        "date": document.querySelector("#modal-tattoo-date").value,
        "time": document.querySelector("#modal-tattoo-time").value
    }
    console.log(tattoo)
    // db_add_tattoo(tattoo)
}