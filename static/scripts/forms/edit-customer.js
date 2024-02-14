
const btnEditCustomer = document.querySelector("#btn-edit-customer")

btnEditCustomer.addEventListener("click", () => {
    document.querySelector("#modal-customer-id").value = selectedCustomer.id
    document.querySelector("#modal-customer-name").value = selectedCustomer.name
    document.querySelector("#modal-customer-phone").value = selectedCustomer.phone
    document.querySelector("#modal-customer-email").value = selectedCustomer.email
    document.querySelector("#modal-customer-birth").value = selectedCustomer.birth
    document.querySelector("#modal-customer-address").value = selectedCustomer.address
    document.querySelector("#modal-customer-instagram").value = selectedCustomer.instagram
})

const editCustomerForm = document.querySelector("#edit-customer-form")
editCustomerForm.addEventListener("submit", (event) => {
    event.preventDefault()

    // Obtém os valores dos campos do formulário
    var id = document.querySelector("#modal-customer-id").value;
    var name = document.querySelector("#modal-customer-name").value;
    var phone = document.querySelector("#modal-customer-phone").value;
    var birth = document.querySelector("#modal-customer-birth").value;
    var email = document.querySelector("#modal-customer-email").value;
    var address = document.querySelector("#modal-customer-address").value;
    var instagram = document.querySelector("#modal-customer-instagram").value;

    var customer = {
        "id": id,
        "name": name,
        "phone": phone,
        "birth": birth,
        "email": email,
        "address": address,
        "instagram": instagram
    }

    updateCustomer(customer)

    // Fechar o modal e atualizar dados de perfil
    document.querySelector("[data-bs-dismiss='modal']").click()
    customer["tattoos"] = selectedCustomer["tattoos"]
    showCustomerProfile(customer)
})


function updateCustomer(customer) {

    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    };
    console.log(options)


    fetch("/customers/update_customer", options)
        .then(response => response.json())
        .then(data => {
            console.log(data)

        })
        .catch(error => console.error("Error:", error))
}
