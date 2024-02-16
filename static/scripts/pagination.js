import { currentCustomer, searchCustomers } from './search-customers.js';
import { showFlashAlert } from './flash.js';


//Customers - Menu
const divMenuCustomers = document.querySelector(".customers__menu")


//Containers
const containerAddCustomer = document.querySelector("#add-customer")
const containerSearchCustomer = document.querySelector("#search-customer")
const containerCustomerProfile = document.querySelector("#customer-profile")


//Btns
const btnCustomersList = document.querySelector("#btn-open-customers-list")
btnCustomersList.addEventListener("click", openCustomersList)
const btnTattoosList = document.querySelector("#btn-open-tattoos-list")
// btnTattoosList.addEventListener("click", openCustomerProfile)
const btnReturnCustomerProfile = document.querySelector("#customer-profile__btn-return")
btnReturnCustomerProfile.addEventListener("click", openCustomersList)
const btnCustomerProfile = document.querySelector("#btn-open-customer-profile")
btnCustomerProfile.addEventListener("click", openCustomerProfile)

// Open Add Customer container
// const btnOpenAddCustomerMenu = document.querySelector("#customers-menu__btn-add-customer")
// btnOpenAddCustomerMenu.addEventListener("click", () => {
//     divMenuCustomers.style.display = "none"
//     containerAddCustomer.style.display = "block"


// })

// Return to menu



//functions
function openCustomersList() {
    containerCustomerProfile.classList.add("d-none")
    containerSearchCustomer.classList.remove("d-none")
    searchCustomers()
    // btnCustomerProfile.classList.remove("active")
    // btnOverview.classList.add("active")
}

function openCustomerProfile() {
    if (currentCustomer == null) {
        showFlashAlert("Nenhum cliente selecionado!", "warning")
        return
    }
    containerSearchCustomer.classList.add("d-none")
    containerCustomerProfile.classList.remove("d-none")
}

export { openCustomersList, openCustomerProfile }

// #debug
setTimeout(() => {
    searchCustomers()
}, 750)