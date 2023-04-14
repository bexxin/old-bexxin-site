"use strict";
/*
Becky Rutherford
COMP125
Assignment 4
*/

//Create the product card containers
let productsContainer = document.getElementById("content");
let rowContainer = document.createElement('div');
rowContainer.className = "row";
productsContainer.appendChild(rowContainer);

//Create the progress bar
let loadBarContainer = document.createElement('div');
loadBarContainer.id = "load-bar-container";
let loadBar = document.createElement('div');
loadBar.id = "load-bar";
loadBarContainer.appendChild(loadBar);
productsContainer.parentNode.insertBefore(loadBarContainer, productsContainer);


let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
            //Create object array from JSON file
            let products = JSON.parse(xhr.responseText);
            //FETCH
            let fetchPromises = products.map(product => {
                if (product.actionURL) {
                    return fetch(product.actionURL)
                        .then(response => {
                            return response.json()
                        })
                        .then(details => {
                            product.actionURL = details;
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            });


            Promise.all(fetchPromises).then(() => {
                for (let i = 0; i < products.length; i++) {
                    setTimeout(function () {
                        constructProductCard();
                        updateLoadBar();
                    }, i * 1000);

                    function constructProductCard() {
                        console.log(products[i]);
                        let product = products[i];

                        //Create product cards 
                        let productCard = document.createElement('div');
                        productCard.className = "product-card";
                        let figureBox = document.createElement('figure');
                        let productImage = document.createElement('img');
                        productImage.className = "product-image";
                        productImage.src = product.src;
                        productImage.alt = product.alt;
                        let imageTitle = document.createElement('figcaption');
                        imageTitle.textContent = product.title;
                        let productInfo = document.createElement('h3');
                        productInfo.textContent = product.description;


                        //Attach to document
                        rowContainer.appendChild(productCard);
                        productCard.appendChild(figureBox);
                        figureBox.appendChild(productImage);
                        figureBox.appendChild(imageTitle);
                        productCard.appendChild(productInfo);
                        //Add button if details link exists
                        if (product.actionLabel) {
                            let button = document.createElement("button");
                            button.innerHTML = product.actionLabel;
                            productCard.appendChild(button);
                            button.onclick = createModal;

                            //Create popup overlay
                            function createModal() {
                                let modalWindow = document.createElement("div");
                                modalWindow.id = "detail-overlay";

                                let overlayfigureBox = document.createElement("figure");
                                modalWindow.appendChild(overlayfigureBox);
                                let modalImage = document.createElement("img");
                                modalImage.className = "modalImage";
                                modalImage.src = productImage.src;
                                overlayfigureBox.appendChild(modalImage);
                                let figureCaption = document.createElement("figcaption");
                                figureCaption.textContent = product.actionURL.details;
                                overlayfigureBox.appendChild(figureCaption);

                                let closeBox = document.createElement("div");
                                closeBox.id = "overlay-close";
                                closeBox.innerHTML = "&times;";
                                closeBox.onclick = function () {
                                    document.body.removeChild(modalWindow);
                                }
                                modalWindow.appendChild(closeBox);

                                document.body.appendChild(modalWindow);


                            }
                        }
                    }

                    function updateLoadBar() {
                        if (Math.floor(loadBarWidth) < 100) {
                            loadBar.innerHTML = "LOADING...";
                            loadBarWidth += loadBarIncrement;
                            loadBar.style.width = loadBarWidth + "%";
                            loadBarFontSize += 4;
                            loadBar.style.fontSize = loadBarFontSize + "px";
                            console.log(Math.floor(loadBarWidth));
                            if (100 <= loadBarWidth) {
                                productsContainer.parentNode.removeChild(loadBarContainer, productsContainer);
                            }
                        }
                    }
                }
            }).catch(error => {
                console.log(error);
            });

            //Setup loadbar increments based on number of objects in array
            let loadBarIncrement = 100 / products.length;
            let loadBarWidth = 0;
            let loadBarFontSize = 20;


        }
    }
}
xhr.open("get", "products.json");
xhr.send(null);





