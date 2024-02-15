import { showCustomerProfile } from './customer-profile.js';
import { openCustomerProfile } from './pagination.js';

// -- Card Search Customer --
// var to store search query
var storedSearch

// request and render results
function searchCustomers() {
    var searchQuery = searchCustomerInput.value

    fetch(`/customers/get_customer_by_name?name=${searchQuery}`)
        .then(response => response.json())
        .then(data => {

            storedSearch = data
            const resultTableBody = document.querySelector("#search-customer-table-body")

            resultTableBody.innerHTML = ""

            if (data.length > 0) {
                data.forEach((customer, index) => {
                    var tattooValues = []
                    for (let tattoo of customer.tattoos) {
                        tattooValues.push(tattoo.price)
                    }

                    if (tattooValues.length == 0) {
                        tattooValues.push(0)
                    }

                    const qtdTattoos = customer.tattoos.length
                    const maxTattooValue = Math.max(...tattooValues)
                    const totalTattooValue = customer.tattoos.reduce((total, tattoo) => total + tattoo.price, 0)
                    let meanTattooValue = (totalTattooValue / qtdTattoos).toFixed(0)
                    if (qtdTattoos == 0) meanTattooValue = 0

                    resultTableBody.innerHTML += `
                        <tr id="result-table-row" data-index="${index}">
                            <td class="search-customer__td-image-name">
                                <img src="../../static/img/user.jpg" alt="${customer.name}">                                
                                <div class="search-customer__name-instagram">
                                    <p>${customer.name}</p>
                                    <p>${customer.instagram}</p>
                                </div>
                            </td>
                            <td class="text-center">${qtdTattoos}</td>
                            <td class="text-center">${maxTattooValue}</td>
                            <td class="text-center">${meanTattooValue}</td>
                            <td class="text-center">${totalTattooValue}</td>

                        </tr>
                    `
                })
            }
            createListenersForTableRowsCustomers()
        })



        .catch(error => console.error("Error:", error))
}

let selectedCustomer
function createListenersForTableRowsCustomers() {
    const resultTableRows = document.querySelectorAll("#result-table-row")
    resultTableRows.forEach((row) => {
        row.addEventListener("click", () => {
            selectedCustomer = storedSearch[row.dataset.index]
            showCustomerProfile(selectedCustomer) //customer-profile
            openCustomerProfile() // pagination

            // window.location.href = `/customers/${row.dataset.id}`
        })
    })
}


// detect event
const searchCustomerInput = document.querySelector("#search-customer-input")
searchCustomerInput.addEventListener("keyup", searchCustomers)




// hide and show sections remover -----------------------------------------
// sectionSearchCustomer.style.display = "block"


// Edit customer modal


export { selectedCustomer, searchCustomers, storedSearch };

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