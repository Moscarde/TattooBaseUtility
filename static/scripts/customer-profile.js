
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

document.querySelector("#btn-add-tattoo").addEventListener("click", () => {
    createInputImageFunction("add-tattoo")
})


function createListenersForTableRowsTattoos() {
    var resultTableRows = document.querySelectorAll("#customer-tattoo-table-row")
    resultTableRows.forEach((row) => {
        row.addEventListener("click", () => {
            selectedTattoo = selectedCustomer.tattoos[row.dataset.index]
            document.querySelector("#btn-open-edit-tattoo").click()
            showTattooInfos(selectedTattoo)
            createInputImageFunction("edit-tattoo")

            // window.location.href = `/customers/${row.dataset.id}`
        })
    })
}