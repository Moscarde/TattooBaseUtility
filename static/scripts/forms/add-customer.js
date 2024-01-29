// -- Card Add Customer --
// show anaminese
const checkAnaminese = document.querySelector("#anaminese-check")

checkAnaminese.addEventListener("click", () => {
    const anaminese = document.querySelector("#anaminese")
    anaminese.style.display = checkAnaminese.checked ? "block" : "none"
})

// enable input by radio
const anamineseQuestions = document.querySelectorAll(".anaminese-question")

anamineseQuestions.forEach((question) => {
    question.querySelector(".anaminese-radios").addEventListener("click", () => {
        const isChecked = question.querySelector(".radio-true").checked;
        const inputAnaminese = question.querySelector(".conditional-input .input-anaminese");

        inputAnaminese.disabled = !isChecked;
    });
})