
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
            showCustomerProfile(selectedCustomer) //customer-profile
            openCustomerProfile()

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




// debug view

function debugCustomer() {


    divMenuCustomers.style.display = "none"
    containerCustomerProfile.style.display = "block"

    searchCustomers()
    setInterval(() => {

        showCustomerProfile(storedSearch[0])
        selectedCustomer = storedSearch[0]
    }, 1500)
    console.log("debug Customer")
}
// debugCustomer()