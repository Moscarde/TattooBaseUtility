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
                listItem.appendChild(img);

                const lastChild = tattooImagesContainer.lastElementChild;
                tattooImagesContainer.insertBefore(listItem, lastChild);
                filePreviews.push(readerTarget.result);
            });

            reader.readAsDataURL(file);
        } else {
            pictureImage.innerHTML = pictureImageTxt;
        }
    }


});
