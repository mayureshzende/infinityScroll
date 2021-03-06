const imageCon = document.getElementById('image-container');
const loader = document.getElementById('loader');
const apikey = 'pJS16-vvxpt27EuXwCAUJ4X-S28j98Y27c6SwKwnbhY';
const count = 20 ;
let photoArray = [];


let ready = false;
let imagesLoaded =  0; 
let totalImages = 0;

// to load more images 
function imageLoaded(){
    imagesLoaded++;
    if( imagesLoaded == totalImages )
    {
        console.log(" hit ");
        ready = true;
        loader.hidden = true;
    }
    console.log('loaded ' + imagesLoaded); 
}

// to get photo using api url from unsplash
async function getPhotos(){
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apikey}&count=${count}`;

    try{
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
    }catch(error){
        console.log(error);
    }
}

//funtion to set the attributes in the 
function setAttributes(element, attrirbutes){
    for( const key in attrirbutes){
        element.setAttribute(key , attrirbutes[key]);
    }
}

// function to display photo from url 
async function displayPhotos() {
    imagesLoaded = 0 ;
    totalImages = photoArray.length ;
    console.log('total images ' , totalImages);
    photoArray.forEach((photo) => {
        // create a anchor to navigate to image
        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item , {
            href : photo.links.html,
            target : '_blank'
        })

        // create a img tag to display image 
        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('tittle',photo.alt_description);
        setAttributes(img , {
            src : photo.urls.regular,
            alt : photo.alt_description ,
            tittle: photo.alt_description
        })

        img.addEventListener('load', imageLoaded);
        
        // put the img in item and then put it in the container
        item.appendChild(img);

        imageCon.appendChild(item);

    })
}; 


///adding a event listner to laod morre photo as we hit the bottom 

window.addEventListener( 'scroll' , () =>{
    if( window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000  && ready )
    {
        ready = false ;
        getPhotos();
    }
})

getPhotos();


