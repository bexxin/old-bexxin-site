"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: 
      Date:   

      Filename: js05.js
*/

window.addEventListener("load", setupGallery);

function setupGallery() {
   let imageCount = imgFiles.length;
   let galleryBox = document.getElementById("lightbox");
   let faveBar = document.getElementById("faveBar");
   let currentSlide = 1;
   let runShow = true;
   let showRunning;

   let favoritesTitle = document.createElement('h1');
   favoritesTitle.id = "faveBarTitle";
   favoritesTitle.textContent = "My Favorite Photos";
   faveBar.appendChild(favoritesTitle);

   let favoritesImageContainer = document.createElement("div");
   favoritesImageContainer.id = "faveImageContainer";
   faveBar.appendChild(favoritesImageContainer);

   let galleryTitle = document.createElement("h1");
   galleryTitle.id = "galleryTitle";
   let slidesTitle = lightboxTitle;
   galleryTitle.textContent = slidesTitle;
   galleryBox.appendChild(galleryTitle);

   let slideCounter = document.createElement("div");
   slideCounter.id = "slideCounter";
   slideCounter.textContent = currentSlide + "/" + imageCount;
   galleryBox.appendChild(slideCounter);

   let leftBox = document.createElement("div");
   leftBox.id = "leftBox";
   leftBox.innerHTML = "&#9664;";
   leftBox.onclick = moveToLeft;
   galleryBox.appendChild(leftBox);

   let rightBox = document.createElement("div");
   rightBox.id = "rightBox";
   rightBox.innerHTML = "&#9654;";
   rightBox.onclick = moveToRight;
   galleryBox.appendChild(rightBox);

   let playPause = document.createElement("div");
   playPause.id = "playPause";
   playPause.innerHTML = "&#9199;";
   playPause.onclick = startStopShow;
   galleryBox.appendChild(playPause);

   let slideBox = document.createElement("div");
   slideBox.id = "slideBox";
   galleryBox.appendChild(slideBox);


   for (let i = 0; i < imageCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createModal;
      slideBox.appendChild(image);
   }

   function moveToRight() {
      let firstImage = slideBox.firstElementChild.cloneNode("true");
      firstImage.onclick = createModal;
      slideBox.appendChild(firstImage);
      slideBox.removeChild(slideBox.firstElementChild);
      currentSlide++;
      if (currentSlide > imageCount) {
         currentSlide = 1;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;
   }

   function moveToLeft() {
      let lastImage = slideBox.lastElementChild.cloneNode("true");
      lastImage.onclick = createModal;
      slideBox.removeChild(slideBox.lastElementChild);
      slideBox.insertBefore(lastImage, slideBox.firstElementChild);
      currentSlide--;
      if (currentSlide === 0) {
         currentSlide = imageCount;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;
   }

   function startStopShow() {
      if (runShow) {
         showRunning = window.setInterval(moveToRight, 2000);
         runShow = false;
      } else {
         window.clearInterval(showRunning);
         runShow = true;
      }
   }




   function createModal() {
      let modalWindow = document.createElement("div");
      modalWindow.id = "lbOverlay";

      let addToFavesButton = document.createElement("div");
      addToFavesButton.id = "lbOverlayFavesButton";
      addToFavesButton.innerHTML = "Add To Favorites";
      addToFavesButton.onclick = addToFavoritesBar;
      modalWindow.appendChild(addToFavesButton);


      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);



      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);

      let figureCaption = document.createElement("figcaption");
      figureCaption.textContent = modalImage.alt;
      figureBox.appendChild(figureCaption);

      let closeBox = document.createElement("div");
      closeBox.id = "lbOverlayClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function () {
         document.body.removeChild(modalWindow);
      }
      modalWindow.appendChild(closeBox);

      document.body.appendChild(modalWindow);


      function addToFavoritesBar() {
         var favoriteImage = modalImage.cloneNode(true);
         favoriteImage.setAttribute("class", "favoritePictures");
         var favepics = document.getElementById("faveBar");
         var favePicsArray = Array.from(favepics.getElementsByTagName("img"));
         var duplicates = favePicsArray.some(duplicatesExist)

         function duplicatesExist(image) {
            return image.alt === modalImage.alt;
         }

         if (duplicates) {

            window.alert("This photo is already in your favorites bar.");
         }
         else if (favePicsArray.length >= 5) {
            window.alert("You have selected the maximum amount of photos. Please remove one to continue.");
            document.body.removeChild(modalWindow);
         }
         else {
            console.log("appending the image to favorites");
            let figContainer = document.createElement("div");
            figContainer.setAttribute("id", "figureWrapper");

            figContainer.onclick = showRemove;
            

            let faveFigure = document.createElement("figure");
            
            let faveCaption = modalImage.getAttribute("alt");
            let faveFigCaption = document.createElement("figcaption");
            faveFigCaption.innerHTML = faveCaption;
            let removeButton = document.createElement("p");
            removeButton.style.visibility = "hidden";
            removeButton.setAttribute("id", "removeButton");
            removeButton.innerHTML = "REMOVE";
            removeButton.onclick = removeImage;
            removeButton.addEventListener("mouseout", hideRemove);
            
            faveFigure.appendChild(favoriteImage);
            faveFigure.appendChild(faveFigCaption);
            figContainer.appendChild(faveFigure);
            figContainer.insertBefore(removeButton, faveFigure);
            favoritesImageContainer.appendChild(figContainer);
            document.body.removeChild(modalWindow);

            function showRemove(){
               removeButton.style.visibility = 'visible';
               console.log("showRemove called")
            }

            function hideRemove(){
               removeButton.style.visibility = "hidden";
            }

            function removeImage() {
               favoritesImageContainer.removeChild(figContainer);
            }

         }
            
      }

     
   }


}



