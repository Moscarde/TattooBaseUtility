import { selectedCustomer, searchCustomers } from './search-customers.js';
import { showFlashAlert } from './flash.js';


//Customers - Menu
const divMenuCustomers = document.querySelector(".customers__menu")


//Containers
const containerAddCustomer = document.querySelector("#add-customer")
const containerSearchCustomer = document.querySelector("#search-customer")
const containerCustomerProfile = document.querySelector("#customer-profile")

//Btns
const btnOverview = document.querySelector("#customers-menu__btn-overview")
btnOverview.addEventListener("click", openOverview)
const btnCustomerProfile = document.querySelector("#customers-menu__btn-customer-profile")
btnCustomerProfile.addEventListener("click", openCustomerProfile)

// Open Add Customer container
const btnOpenAddCustomerMenu = document.querySelector("#customers-menu__btn-add-customer")
btnOpenAddCustomerMenu.addEventListener("click", () => {
    divMenuCustomers.style.display = "none"
    containerAddCustomer.style.display = "block"


})

// Return to menu



//functions
function openOverview() {
    containerCustomerProfile.classList.add("d-none")
    containerSearchCustomer.classList.remove("d-none")
    btnCustomerProfile.classList.remove("active")
    btnOverview.classList.add("active")
}

function openCustomerProfile() {
    if (selectedCustomer == null) {
        showFlashAlert("Nenhum cliente selecionado!", "warning")
        return
    }
    containerSearchCustomer.classList.add("d-none")
    containerCustomerProfile.classList.remove("d-none")
    btnCustomerProfile.classList.add("active")
    btnOverview.classList.remove("active")
}

export { openOverview, openCustomerProfile }

// #debug
setTimeout(() => {
    searchCustomers()

}, 750)