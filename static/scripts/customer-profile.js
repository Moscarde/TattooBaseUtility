import { createInputImageFunction } from './forms/image-upload.js'
import { searchCustomers } from './search-customers.js'
import { selectedCustomer } from './search-customers.js'
import { showTattooInfos } from './forms/edit-tattoo.js'

function showCustomerProfile(selectedCustomer) {

    document.querySelector("#customer-name").innerHTML = selectedCustomer.name
    document.querySelector("#customer-phone").innerHTML = selectedCustomer.phone
    document.querySelector("#customer-email").innerHTML = selectedCustomer.email
    document.querySelector("#customer-birth").innerHTML = selectedCustomer.birth
    document.querySelector("#customer-address").innerHTML = selectedCustomer.address
    document.querySelector("#customer-instagram").innerHTML = selectedCustomer.instagram
    
    document.querySelector("#add-tattoo__customer-id").value = selectedCustomer.id

    const tattooTableBody = document.querySelector("#customer-tattoo-table-body")

    tattooTableBody.innerHTML = ""

    if (selectedCustomer.tattoos.length > 0) {
        selectedCustomer.tattoos.forEach((tattoo, index) => {


            tattooTableBody.innerHTML += `
                        <tr id="customer-tattoo-table-row" data-index="${index}">
                            <td>${tattoo.date}</td>
                            <td>${tattoo.tattoo_name}</td>
                            <td>${tattoo.description}</td>
                            <td class="text-center">${tattoo.price}</td>
                            <td class="text-center">${tattoo.payment}</td>
                        </tr>
                    `
        })
    }
    createListenersForTableRowsTattoos()
}

document.querySelectorAll("#btn-add-tattoo").forEach((btn) => {
    btn.addEventListener("click", () => {
        fillCustomerName(selectedCustomer)
        createInputImageFunction("modal-add-tattoo")
    })
})


function fillCustomerName(selectedCustomer) {
    // console.log("fillCustomerName", selectedCustomer.name)
    if (selectedCustomer) {
        document.querySelector("#add-tattoo__customer-name").value = selectedCustomer.name
    }
    
}

function createListenersForTableRowsTattoos() {
    var resultTableRows = document.querySelectorAll("#customer-tattoo-table-row")
    resultTableRows.forEach((row) => {
        row.addEventListener("click", () => {
            const selectedTattoo = selectedCustomer.tattoos[row.dataset.index]
            document.querySelector("#btn-open-edit-tattoo").click()
            showTattooInfos(selectedTattoo)
            createInputImageFunction("edit-tattoo")

            // window.location.href = `/customers/${row.dataset.id}`
        })
    })
}

export { showCustomerProfile }