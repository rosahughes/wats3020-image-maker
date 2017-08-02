/* WATS 3020 Image Maker Code */

//////////////////////////////////////////////////
// ImageMaker Class Definition               /////
////////////////////////////////////////////////////////////////////////
// This class is used to manage the image manipulation and prep on    //
// the page. It is instantiated when the page is loaded, and it       //
// handles all the logic of updating the image preview with the data  //
// submitted by users via the image maker form.                       //
////////////////////////////////////////////////////////////////////////

class ImageMaker {
    constructor(){
        // When this class is instantiated, the `constructor()` method is executed.
        // Select the `#image-preview` div.
        this.imagePreview = document.getElementById('image-preview');
        
        // topText
        this.topText = document.createElement('p'); // New `<p>` element called `this.topText`
        this.topText.setAttribute('class', 'top-text'); // Add `class`, classname "top-text".
        this.imagePreview.appendChild(this.topText); // Append `this.topText` as child element to `this.imagePreview`
        
        // bottomText
        this.bottomText = document.createElement('p'); // New `<p>` element called `this.bottomText`
        this.bottomText.setAttribute('class', 'bottom-text'); // Add `class`, classname "bottom-text".
        this.imagePreview.appendChild(this.bottomText); // Append `this.bottomText` as child element to `this.imagePreview`
        
        
        // This class also uses the form fields to read user input. 
        // Select the `input` element with the `name` attribute "backgroundImage"
        this.backgroundInput = document.querySelector('select[name="backgroundImage"]');
        // Select the `input` element with the `name` attribute "topText"
        this.topTextInput = document.querySelector('input[name="topText"]');
        // Select the `input` element with the `name` attribute "bottomText"
        this.bottomTextInput = document.querySelector('input[name="bottomText"]');
        // Select the `input` element with the attribute "textColor"
        this.topText.textColorInput = document.querySelector('input[name="topTextColor"]');
        // `bottomText` color
        this.bottomText.textColorInput = document.querySelector('input[name="bottomTextColor"]');
    }
    
  drawPreview(){
        // This function is called whenever a user changes one of the form fields
        // and whenever an image is generated for download. This function must
        // update the style attributes and innerHTML content of the HTML
        // elements selected in the `constructor()` of this class in order to
        // update `this.imagePreview`.

        // Update the `background-image` CSS property for `this.imagePreview`.
        this.imagePreview.style.backgroundImage = `url(images/${this.backgroundInput.value})`;
        // Update the `innerHTML` of `this.topText`.
        this.topText.innerHTML = this.topTextInput.value;
        // Update the `innerHTML` of `this.bottomText`
        this.bottomText.innerHTML = this.bottomTextInput.value;
        // Update the `topText` color
        this.topText.style.color = this.topText.textColorInput.value;
        // Update the 'bottomText` color
        this.bottomText.style.color = this.bottomText.textColorInput.value;

    }
    downloadImage(){
        this.drawPreview();
        generateImage();
    }
}

let imageMaker = new ImageMaker();

//////////////////////////////////////////////////
// Do Not Edit Below This Line               /////
////////////////////////////////////////////////////////////////////////

// This function uses the `domtoimage` module to render an image of the
// `#image-preview` element and prompts the user to download the created image.
// It is possible to use the `height` and `width` parameters to alter the size
// of the rendered image.
function generateImage(elementID="image-preview", height="800px", width="1280px"){
    let htmlTemplate = document.getElementById(elementID);
    htmlTemplate.style.height = height;
    htmlTemplate.style.width = width;
    let imageName = "image_" + Date.now();

    // Generate image and prompt download for user.
    domtoimage.toJpeg(htmlTemplate, { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = imageName;
            link.href = dataUrl;
            link.click();
        });
}


// This function creates event listeners for each every form field added to
// the image maker form as well as the submit button that generates an image
// for download. New form inputs can be created and will automatically have
// a "change" listener added to them.
//
// The form field listeners look for a "change" event and call the
// `imageMaker.drawPreview()` method.
//
// The submit listener on the form interrupts the regular form processing of the
// browser and calls the `imageMaker.downloadImage()` method.
function applyEventListeners(){
    let inputs = document.querySelectorAll('input, select, textarea');
    for (input of inputs){
        input.addEventListener("change", function(event){
            imageMaker.drawPreview();
        })
    }
    let imageForm = document.querySelector('form');
    imageForm.addEventListener('submit', function(event){
        event.preventDefault();
        imageMaker.downloadImage();
    })
}

// Apply event listeners on page load.
applyEventListeners();
