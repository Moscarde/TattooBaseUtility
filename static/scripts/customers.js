
// -- Card Search Customer --
// var to store search query
var storedSearch = null

// request and render results
function searchCustomers() {
    var searchQuery = searchCustomerInput.value

    fetch(`/customers/get_customer_by_name?name=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            storedSearch = data
            resultTableBody = document.querySelector("#result-table-body")

            resultTableBody.innerHTML = ""

            if (data.length > 0) {
                data.forEach((customer, index) => {
                    var tattooValues = []
                    for (tattoo of customer.tattoos) {
                        tattooValues.push(tattoo.price)
                    }

                    if (tattooValues.length == 0) {
                        tattooValues.push(0)
                    }

                    var qtdTattoos = customer.tattoos.length
                    var maxTattooValue = Math.max(...tattooValues)
                    var totalTattooValue = customer.tattoos.reduce((total, tattoo) => total + tattoo.price, 0)
                    var meanTattooValue = (totalTattooValue / qtdTattoos).toFixed(0)
                    if (qtdTattoos == 0) meanTattooValue = 0

                    resultTableBody.innerHTML += `
                        <tr id="result-table-row" data-index="${index}">
                            <th scope="row">${index + 1}</th>
                            <td>${customer.name}</td>
                            <td>${qtdTattoos}</td>
                            <td>${maxTattooValue}</td>
                            <td>${meanTattooValue}</td>
                            <td>${totalTattooValue}</td>

                        </tr>
                    `
                })
            }
            createListenersForTableRowsCustomers()
        })



        .catch(error => console.error("Error:", error))

}

var selectedCustomer = null
function createListenersForTableRowsCustomers() {
    var resultTableRows = document.querySelectorAll("#result-table-row")
    resultTableRows.forEach((row) => {
        row.addEventListener("click", () => {
            selectedCustomer = storedSearch[row.dataset.index]
            showCustomerProfile(selectedCustomer)
            openCustomerProfile()

            // window.location.href = `/customers/${row.dataset.id}`
        })
    })
}

function showCustomerProfile(selectedCustomer) {

    document.querySelector("#customer-name").innerHTML = selectedCustomer.name
    document.querySelector("#customer-phone").innerHTML = selectedCustomer.phone
    document.querySelector("#customer-email").innerHTML = selectedCustomer.email
    document.querySelector("#customer-birth").innerHTML = selectedCustomer.birth
    document.querySelector("#customer-address").innerHTML = selectedCustomer.address
    document.querySelector("#customer-instagram").innerHTML = selectedCustomer.instagram
    
    document.querySelector("#add-tattoo__customer-id").value = selectedCustomer.id

    tattooTableBody = document.querySelector("#customer-tattoo-table-body")

    tattooTableBody.innerHTML = ""

    if (selectedCustomer.tattoos.length > 0) {
        selectedCustomer.tattoos.forEach((tattoo, index) => {


            tattooTableBody.innerHTML += `
                        <tr id="customer-tattoo-table-row" data-index="${index}">
                            <th scope="row">${tattoo.date}</th>
                            <td>${tattoo.tattoo_name}</td>
                            <td>${tattoo.description}</td>
                            <td>${tattoo.price}</td>
                            <td>${tattoo.payment}</td>
                        </tr>
                    `
        })
    }
    createListenersForTableRowsTattoos()
}

function createListenersForTableRowsTattoos() {
    var resultTableRows = document.querySelectorAll("#customer-tattoo-table-row")
    resultTableRows.forEach((row) => {
        row.addEventListener("click", () => {
            selectedTattoo = selectedCustomer.tattoos[row.dataset.index]
            document.querySelector("#btn-open-edit-tattoo").click()
            showTattooInfos(selectedTattoo)

            // window.location.href = `/customers/${row.dataset.id}`
        })
    })
}

function openCustomerProfile() {
    containerSearchCustomer.style.display = "none"
    containerCustomerProfile.style.display = "block"
}

// detect event
const searchCustomerInput = document.querySelector("#search-customer-input")
searchCustomerInput.addEventListener("keyup", searchCustomers)




// hide and show sections remover -----------------------------------------
// sectionSearchCustomer.style.display = "block"


// Edit customer modal

btnEditCustomer = document.querySelector("#btn-edit-customer")

btnEditCustomer.addEventListener("click", () => {
    document.querySelector("#modal-customer-id").value = selectedCustomer.id
    document.querySelector("#modal-customer-name").value = selectedCustomer.name
    document.querySelector("#modal-customer-phone").value = selectedCustomer.phone
    document.querySelector("#modal-customer-email").value = selectedCustomer.email
    document.querySelector("#modal-customer-birth").value = selectedCustomer.birth
    document.querySelector("#modal-customer-address").value = selectedCustomer.address
    document.querySelector("#modal-customer-instagram").value = selectedCustomer.instagram
})

editCustomerForm = document.querySelector("#edit-customer-form")
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




// debug view

function debugCustomer() {


    divMenuCustomers.style.display = "none"
    containerCustomerProfile.style.display = "block"

    searchCustomers()
    setInterval(() => {

        showCustomerProfile(storedSearch[0])
        selectedCustomer = storedSearch[0]
    }, 500)
    console.log("debug Customer")
}
debugCustomer()