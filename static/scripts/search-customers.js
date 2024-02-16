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
            document.querySelector("#search-customer__result-count").innerHTML = `Exibindo ${data.length > itensPerPage ? itensPerPage : data.length} de ${data.length} resultados encontrados`;
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
                    const totalTattooValue = customer.tattoos.reduce((total, tattoo) => {
                        if (tattoo.price == "") {
                            return total
                        } else {
                            return total + tattoo.price
                        }
                    }, 0)

                    let meanTattooValue = (totalTattooValue / qtdTattoos).toFixed(0)

                    if (qtdTattoos == 0) meanTattooValue = 0

                    resultTableBody.innerHTML += `
                        <tr id="result-table-row" data-index="${index}" class="d-none">
                            <td class="table__image-name">
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
            resultPage = 1
            pagination()
            createListenersForTableRowsCustomers()


        })

        .catch(error => console.error("Error:", error))
}

let currentCustomer

let resultPage = 1
const itensPerPage = 4
function pagination() {
    const resultTableRows = document.querySelectorAll("#result-table-row")
    
    const firstItem = (resultPage * itensPerPage) - itensPerPage
    const lastItem = resultPage * itensPerPage
    resultTableRows.forEach((row, index) => {
        if (index >= firstItem && index < lastItem) {
            row.classList.remove("d-none")
        } else {
            row.classList.add("d-none")
        }
    })

    if (resultTableRows.length > itensPerPage) {
        nextPage.classList.remove("cursor-na")
        nextPage.classList.add("cursor-a")
    } else {
        nextPage.classList.add("cursor-na")
        nextPage.classList.remove("cursor-a")
    }
    //                   3                    3

    let lastPage = Math.ceil(resultTableRows.length / itensPerPage)

    if (resultPage == lastPage) {
        console.log("ultima")
        nextPage.classList.add("cursor-na")
        nextPage.classList.remove("cursor-a")

    }

    
}

const nextPage = document.querySelector("#pagination-next")
const previousPage = document.querySelector("#pagination-previous")

nextPage.addEventListener("click", () => {
    if (nextPage.classList.contains("cursor-na")) {
        return
    }

    if (resultPage < Math.ceil(storedSearch.length / itensPerPage)) {
        resultPage++
        pagination()
        previousPage.classList.remove("cursor-na")
        previousPage.classList.add("cursor-a")
    }
})

previousPage.addEventListener("click", () => {
    if (previousPage.classList.contains("cursor-na")) {
        return
    }

    if (resultPage > 1) {
        resultPage--
        pagination()
    }
    if (resultPage == 1) {
        previousPage.classList.remove("cursor-a")
        previousPage.classList.add("cursor-na")
    }
})

function createListenersForTableRowsCustomers() {
    const resultTableRows = document.querySelectorAll("#result-table-row")
    resultTableRows.forEach((row) => {
        row.addEventListener("click", () => {
            currentCustomer = storedSearch[row.dataset.index]
            showCustomerProfile(currentCustomer) //customer-profile
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


export { currentCustomer, searchCustomers, storedSearch };

// debug view

function debugCustomer() {


    divMenuCustomers.style.display = "none"
    containerCustomerProfile.style.display = "block"

    searchCustomers()
    setInterval(() => {

        showCustomerProfile(storedSearch[0])
        currentCustomer = storedSearch[0]
    }, 1500)
    console.log("debug Customer")
}
// debugCustomer()