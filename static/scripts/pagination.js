//Customers - Menu
divMenuCustomers = document.querySelector(".customers-menu")
containerAddCustomer = document.querySelector("#add-customer")
containerSearchCustomer = document.querySelector("#search-customer")
containerCustomerProfile = document.querySelector("#customer-profile")

// Open Add Customer container
btnOpenAddCustomerMenu = document.querySelector("#customers-menu__btn-add-customer")
btnOpenAddCustomerMenu.addEventListener("click", () => {
    divMenuCustomers.style.display = "none"
    containerAddCustomer.style.display = "block"


})

// Open Search Customer container
btnOpenViewCustomersMenu = document.querySelector("#customers-menu__btn-view-customers")
btnOpenViewCustomersMenu.addEventListener("click", () => {
    divMenuCustomers.style.display = "none"
    containerSearchCustomer.style.display = "block"
    searchCustomers()

})

// Return to menu
btnReturn = document.querySelectorAll("#btn-return")
btnReturn.forEach((btn) => {
    btn.addEventListener("click", () => {
        divMenuCustomers.style.display = "block"
        containerAddCustomer.style.display = "none"
        containerSearchCustomer.style.display = "none"
    })
})

// Return to search
btnReturnSearch = document.querySelector("#btn-return-to-search")
btnReturnSearch.addEventListener("click", () => {
    containerSearchCustomer.style.display = "block"
    containerCustomerProfile.style.display = "none"
})
