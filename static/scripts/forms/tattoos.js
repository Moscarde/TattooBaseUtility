const inputFile = document.querySelector(".picture__input");
const tattooImagesContainer = document.querySelector("#add-tattoo__images");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = "Choose an image";
pictureImage.innerHTML = pictureImageTxt;
const filePreviews = [];

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
                    console.log("click");
                    filePreviews.splice(filePreviews.indexOf(readerTarget.result), 1);
                    listItem.remove();
                })

                const lastChild = tattooImagesContainer.lastElementChild;
                tattooImagesContainer.insertBefore(listItem, lastChild);
            });

            reader.readAsDataURL(file);
        } else {
            pictureImage.innerHTML = pictureImageTxt;
        }
    }
});

const imagePopup = document.getElementById('imagePopup');
const popupImage = document.getElementById('popupImage');
const tattoosTable = document.querySelector("#customer-tattoo-table")

tattoosTable.addEventListener("mouseover", (event) => {
    const targetRow = event.target.closest("tr");

    if (targetRow) {
        const imageURL = getRowImageURL(targetRow);
        if (!imageURL) return;
        const popupContent = `<img src="../static/img/tattoos/${imageURL}" class="img-fluid">`;

        $(targetRow).popover({
            content: popupContent,
            html: true,
            placement: 'right', // ou ajuste conforme necessário
            trigger: 'hover',
            delay: { "show": 1000, "hide": 125 }
        });
        $(targetRow).popover('show');
    }
})

tattoosTable.addEventListener("mouseout", (event) => {
    $(event.target).popover('hide');
})

function getRowImageURL(row) {
    const index = row.dataset.index;
    if (index) {
        if (selectedCustomer.tattoos[index].images.length > 0) {
            return selectedCustomer.tattoos[index].images[0];
        } else {
            return null;
        }
    }
    return null;
}
