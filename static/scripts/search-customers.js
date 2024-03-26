import { showCustomerProfile } from './customer-profile.js';
import { openCustomerProfile } from './pagination.js';
import { sortAscending, sortDescending } from './utils.js';

// -- Card Search Customer --
// var to store search query
var storedSearch

// request and render results
function searchCustomers() {
    var searchQuery = searchCustomerInput.value

    fetch(`/customers/get_customer_by_name?name=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            processCustomers(data)
        })

        .catch(error => console.error("Error:", error))
}

let processedCustomers = []
function processCustomers(customersList) {
    processedCustomers = []
    storedSearch = customersList

    if (customersList.length > 0) {
        customersList.forEach((customer, index) => {
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

            processedCustomers.push({
                name: customer.name,
                instagram: customer.instagram,
                qtdTattoos: qtdTattoos,
                maxTattooValue: maxTattooValue,
                meanTattooValue: meanTattooValue,
                totalTattooValue: totalTattooValue,
                id: customer.id,
                index: index
            })


        })
    }
    resultPage = 1
    displayResults(processedCustomers)
    pagination()
    // createListenersForTableRowsCustomers()
}

function displayResults(customersList) {
    document.querySelector("#search-customer__result-count").innerHTML = `Exibindo ${customersList.length > itensPerPage ? itensPerPage : customersList.length} de ${customersList.length} resultados encontrados`;

    const resultTableBody = document.querySelector("#search-customer-table-body")
    resultTableBody.innerHTML = ""

    for (let customer of customersList) {
        resultTableBody.innerHTML += `
                            <tr id="result-table-row" data-index="${customer.index}" class="d-none" data-id="${customer.id}">
                                <td class="table__image-name">
                                    <div class="table__row-content">
                                        <img src="../../static/img/user.jpg" alt="${customer.name}">                                
                                        <div class="search-customer__name-instagram">
                                            <p>${customer.name}</p>
                                            <p>${customer.instagram}</p>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div class="table__row-content">
                                        ${customer.qtdTattoos}
                                    </div>
                                </td>

                                <td>
                                    <div class="table__row-content">    
                                        ${customer.maxTattooValue}
                                    </div>
                                </td>

                                <td>
                                    <div class="table__row-content"> 
                                        ${customer.meanTattooValue}
                                    </div>
                                </td>

                                <td>
                                    <div class="table__row-content"> 
                                        ${customer.totalTattooValue}
                                    </div>
                                </td>

                            </tr>
                        `
    }

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

// function createListenersForTableRowsCustomers() {

// }




// detect event
const searchCustomerInput = document.querySelector("#search-customer-input")
searchCustomerInput.addEventListener("keyup", searchCustomers)

// filter table
let filteredCustomers;
const filterTableHead = document.querySelector("#filter-table")
filterTableHead.querySelectorAll("th").forEach((column) => {
    column.addEventListener("click", () => {
        const filter = column.dataset.filter
        console.log("Filtrando por", filter, "orientação", column.dataset.orientation)
        
        filterTableHead.querySelectorAll("th").forEach((column) => {
            column.classList.replace("th-bold", "th-light")
            column.querySelector(".table__header-icon").classList.remove("bi-arrow-up-circle-fill", "bi-arrow-down-circle-fill")
            
        })
        column.classList.replace("th-light", "th-bold")

        if (column.dataset.orientation == "desc") {
            column.dataset.orientation = "asc"
            filteredCustomers = sortAscending(processedCustomers, filter)
            column.querySelector(".table__header-icon").classList.add("bi-arrow-up-circle-fill")
        } else {
            column.dataset.orientation = "desc"
            filteredCustomers = sortDescending(processedCustomers, filter)
            column.querySelector(".table__header-icon").classList.add("bi-arrow-down-circle-fill")
        }

        displayResults(filteredCustomers)
        pagination()


    })
})




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