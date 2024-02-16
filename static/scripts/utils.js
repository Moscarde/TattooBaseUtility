function clearForm(listInputs) {
    listInputs.forEach((input) => {
        input.value = ""
    })
}

export { clearForm }