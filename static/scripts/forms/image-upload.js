
let filePreviews = [];

function createInputImageFunction(modalId) {
    console.log('createInputImageFunction')
    modal = document.querySelector(`#${modalId}`);

    const inputFile = modal.querySelector(".picture__input");
    const tattooImagesContainer = modal.querySelector(".add-tattoo__images-list");
    const pictureImage = modal.querySelector(".picture__image");
    

    inputFile.addEventListener("change", function (e) {
        const inputTarget = e.target;
        const files = inputTarget.files;

        for (const file of files) {
            if (file) {
                const reader = new FileReader();

                reader.addEventListener("load", function (e) {
                    const readerTarget = e.target;

                    const img = document.createElement("img");
                    img.src = readerTarget.result;
                    img.classList.add("picture__img");

                    const listItem = document.createElement("li");
                    listItem.classList.add("picture__item");
                    listItem.appendChild(img);
                    filePreviews.push(readerTarget.result);

                    listItem.addEventListener("click", () => {
                        filePreviews.splice(filePreviews.indexOf(readerTarget.result), 1);
                        listItem.remove();
                    })

                    const lastChild = tattooImagesContainer.lastElementChild;
                    tattooImagesContainer.insertBefore(listItem, lastChild);
                });

                reader.readAsDataURL(file);
            }
        }
    });

}