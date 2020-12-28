var slideIndex;

function startSlides() {
    slideIndex = 1;
    showSlideMedia(slideIndex);
}
function previousSlide() {
    slideIndex -= 1;
    showSlideMedia(slideIndex);
}

function nextSlide() {
    slideIndex += 1;
    showSlideMedia(slideIndex);
}

function showSlideMedia(indexNo) {
    let slideMediasContainer = document.getElementsByClassName("slideMediasContainer");

    if (indexNo < 1) {
        slideIndex = slideMediasContainer.length;
    } else if (indexNo > slideMediasContainer.length) {
        slideIndex = 1;
    }

    // console.log("slide length:" + slideMediasContainer.length);
    if(slideMediasContainer.length > 0) {
        for (let i = 0; i < slideMediasContainer.length; i++) {
            slideMediasContainer[i].style.display = "none";
        }
        
        // console.log(slideMediasContainer[slideIndex-1]);
        slideMediasContainer[slideIndex-1].style.display = "block";
    }
}

function displayHome() {

    //Top slide section
    displaySection("Slide", "homeTopSlide");

    //Today's Journey section
    displaySection("Today's Journey", "today");

    //Sportlight section
    displaySection("Sportlight", "sportlight");

    //Popular section
    displaySection("Popular", "popular");

}

function displayThemeTravel() {
    displaySection("The places in Movies & TV", "movie");
    displaySection("Travel with a Food", "food");
    displaySection("Travel with children", "children");
}

function displayMemorablePlaces() {
    displaySection("Mother and daughter", "momAndDaughter");
    displaySection("Graduation trip", "graduation");
    displaySection("Same place, different time", "samePlace");
}

function displayTravelRoutes() {
    displaySection("Hiking routes", "hiking");
    displaySection("Driving routes", "driving");
    displaySection("Bicycle routes", "bicycle");
}

function displayMyTravel() {
    displaySection("My List", "myList");
    displaySection("Following", "following");
}

function displaySection(sectionType, sectionId) {

    let sectionContents = [];
    let count = 0;

    // fetch section contents
    for(let i = 0; i < data.length; i ++) {

        if(sectionType == "Slide" ||
           sectionType == "Today's Journey" ||
           sectionType == "Sportlight" ||
           sectionType == "Popular") {

            if(data[i]["colSpecialSection"] != "") {
                let colSpecialSection = data[i]["colSpecialSection"].split(",");
                for(let j=0; j < colSpecialSection.length; j++) {
                    if(colSpecialSection[j] == sectionType) {
                        sectionContents[count++] = data[i]["colKeyValue"];
                        break;
                    }
                }
            }
        }else if(sectionType == "My List") {
            if(data[i]["mineYN"] == true) {
                sectionContents[count++] = data[i]["colKeyValue"];
            }
        }else if(sectionType == "Following") {
            if(data[i]["followingYN"] == true) {
                sectionContents[count++] = data[i]["colKeyValue"];
            }
        }else {
            if(data[i]["colSubSection"] == sectionType) {
                sectionContents[count++] = data[i]["colKeyValue"];
            }
        }
    }

    if(sectionType == "Slide") {
        for(let i = 0; i < sectionContents.length; i++) {
            displaySlideContainer(sectionId, sectionContents[i]);
        }
        startSlides();

    }else if(sectionType == "My List") {
        let optionalBtn = "<a href='addtravel.html'>&#43;</a>";
        displaySectionContainer(sectionType, sectionId, sectionContents, optionalBtn);

    }else if(sectionType == "Following") {
        let optionalBtn = "<a href=''>&#9776;</a>";
        displaySectionContainer(sectionType, sectionId, sectionContents, optionalBtn);

    }else { 
        displaySectionContainer(sectionType, sectionId, sectionContents, "");
    }
}

function displaySlideContainer(sectionId, colKeyValue) {
    // <div id="homeTopSlide" class="slideContainer">
    //     <div class="slideMediasContainer">
    //         <input value="1" hidden>
    //         <img class="slideMedias" src="">
    //         <h3 class="slideText"><a onclick="detailTravel(this, colKeyValue);"></a></h3>
    //         <p hidden></p>
    //     </div>
    // </div>

    //parent div container
    let slideContainer = document.querySelector("#"+ sectionId);

    //Create div section(slideImagesConatainer)
    let mediasContainer = document.createElement("div");
    mediasContainer.className = "slideMediasContainer";

    slideContainer.appendChild(mediasContainer);

    //input hidden field(key value)
    let inputText = document.createElement("input");
    inputText.value = colKeyValue;
    inputText.setAttribute('hidden', "true");

    mediasContainer.appendChild(inputText);

    //create image or iframe, or source element of the column
    createMediaElement(mediasContainer, colKeyValue, "slideMedias");

    //h3(anchor)
    let heading = document.createElement("h3");
    heading.className = "slideText";

    //anchor
    let anchor = document.createElement("a");
    anchor.setAttribute('onclick', "detailTravel(this," + colKeyValue + ");");
    anchor.textContent = data[colKeyValue-1]["colTitle"];
    heading.appendChild(anchor);

    mediasContainer.appendChild(heading);

    //paragraph(hidden:description)
    let paragraphDes = document.createElement("p");
    paragraphDes.setAttribute('hidden', "true");
    paragraphDes.textContent = description[colKeyValue-1]["colDescription"];

    mediasContainer.appendChild(paragraphDes);
}

function displaySectionContainer(sectionType, sectionId, sectionContents, optionalBtn) {
    // <div id="today" class="singleColumnContainer">
    //     <h2>Today's Journey</h2>
    //     <div class="columnContainer">
    //         <div class="column">
    //             <input value="4" hidden>
    //             <img src="images/brycecanyon.jpg" alt="Bryce Canyon">
    //             <h3><a onclick="detailTravel(this, colKeyValue);"></a></h3>
    //             <p></p>
    //         </div>
    //     </div>
    // </div>

    let sectionContainer = document.querySelector("#" + sectionId);

    //Create h2 
    let newSectionTitle = document.createElement("h2");
    newSectionTitle.innerHTML = sectionType + " " + optionalBtn;
    sectionContainer.appendChild(newSectionTitle);

    //Create div section(columnContainer)
    let columnContainer = document.createElement("div");
    columnContainer.className = "columnContainer";
    sectionContainer.appendChild(columnContainer);

    //console.log("sectionContents:" + sectionContents);

    let div;
    for(let i = 0; i < sectionContents.length; i++) {

        //if columns are greater than four in the section, change new line.
        if(sectionContents.length > 4 && (i % 4) == 0) {
            columnContainer = document.createElement("div");
            columnContainer.className = "columnContainer";
            sectionContainer.appendChild(columnContainer);
        }
        displayColumnContainer(columnContainer, sectionContents[i], i, sectionContents.length);
    }
}

function displayColumnContainer(parentNode, colKeyValue, index, length) {
    //Create div section(column)
    let column = document.createElement("div");
    column.className = "column";

    //if column is only one in column container of the section, change the width of the column to 100%.
    if(length == 1 || (length > 4 && (length == index+1) )) {
        column.style.width = "100%";
    }
    parentNode.appendChild(column);

    //input hidden field(key value)
    let inputText = document.createElement("input");
    inputText.value = colKeyValue;
    inputText.setAttribute('hidden', "true");
    column.appendChild(inputText);

    //create image or iframe, or source element of the column
    createMediaElement(column, colKeyValue, "");

    //h3(anchor)
    let heading = document.createElement("h3");

    //anchor
    let anchor = document.createElement("a");
    anchor.setAttribute('onclick', "detailTravel(this," + colKeyValue + ");");
    anchor.textContent = data[colKeyValue-1]["colTitle"];
    heading.appendChild(anchor);

    column.appendChild(heading);

    //paragraph(description)
    let paragraphDes = document.createElement("p");
    if(description[colKeyValue-1]["colDescription"] != ""  && description[colKeyValue-1]["colDescription"].length > 100) {
        paragraphDes.textContent = description[colKeyValue-1]["colDescription"].substr(0, 100) + "...";
    }else {
        paragraphDes.textContent = description[colKeyValue-1]["colDescription"];
    }

    column.appendChild(paragraphDes);
}

function detailTravel(element, colKeyValue) {   
    
    // Passing by url parameter
    // // let divColumn = document.querySelector('.column'); // parent div column

    // let divColumn = element.parentNode.parentNode;  // current: <a>, parent: <h3>, grandparent: <div column>
    // // console.log(divColumn);

    // // let childNodes = divColumn.childNodes;
    // let children = divColumn.children;
    // // console.log(children);

    // let colKeyValue = children[0].value; //Key value
    // console.log(colKeyValue);

    // let colMediaType = children[1].nodeName; //IMG or IFRAME
    // let colMedia = children[1].outerHTML.replace(/(\r\n|\n|\r)/gm, ""); //img or iframe element
    // let colTitle = children[2].innerText.replace(/(\r\n|\n|\r)/gm, ""); // h3, p... element
    // let colDescription = "";
    // if(children.length > 3) {
    //     colDescription = children[3].innerHTML.replace(/(\r\n|\n|\r)/gm, ""); // p... element
    // }
    // console.log(colMediaType);
    // window.location.href = "detailtravel.html?colKeyValue=" + colKeyValue + "&colMediaType=" + colMediaType + "&colMedia=" + colMedia + "&colTitle=" + colTitle + "&colDescription=" + colDescription;

    // //window.open("detailtravel.html?colKeyValue=" + colKeyValue, "_self");

    window.location.href = "detailtravel.html?colKeyValue=" + colKeyValue;
}

function displayDetail() {       
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);

    let colKeyValue = urlParams.get('colKeyValue');
    document.getElementById("colKeyValue").value = colKeyValue;
    console.log(colKeyValue);

    // Getting by url parameter
    // let colMediaType = urlParams.get('colMediaType');
    // let colMedia = urlParams.get('colMedia');
    // let colTitle = urlParams.get('colTitle');
    // let colDescription = urlParams.get('colDescription');

    // console.log(colMediaType);
    // console.log(colMedia);
    // console.log(colTitle);
    // console.log(colDescription);
    // console.log(userComments[colKeyValue-1]["colComment"]);

    // document.getElementById("colMedia").outerHTML = colMedia;
    // document.getElementById("colTitle").innerHTML = colTitle;
    // document.getElementById("colDescription").innerHTML = colDescription;

    createMediaElement(document.getElementById("colMedia"), colKeyValue);
    document.getElementById("colTitle").innerHTML = data[colKeyValue-1]["colTitle"];
    document.getElementById("colDescription").innerHTML = description[colKeyValue-1]["colDescription"];

    for(let i=0; i < data[colKeyValue-1]["colStar"]; i++) {
        document.getElementById("colStar").innerHTML += "<span>&#9733;"
    }  

    if(userComments[colKeyValue-1]["colComment"] != "") {
        let userReview = userComments[colKeyValue-1]["colComment"].split(",");
        for(let i=0; i < userReview.length; i++) {
            document.getElementById("colReview").innerHTML += userReview[i] + "<br>";
        }
    }

    if(locationMap[colKeyValue-1]["colMap"] != "") {
        let latlngStr = locationMap[colKeyValue-1]["colMap"].split(",");
        let latlng = {
            lat: parseFloat(latlngStr[0]),
            lng: parseFloat(latlngStr[1])
        };

        console.log(latlngStr[0]);
        console.log(latlngStr[1]);

        let map = new google.maps.Map(document.getElementById("colMapByAPI"), {
            zoom: 7,
            center: latlng,
        });
        let marker = new google.maps.Marker({
            position: latlng,
            map,
            title: data[colKeyValue-1]["colTitle"],
        });
    }else {
        document.getElementById("colMapByAPI").style.height = 0;
    }

    if(relatedUrls[colKeyValue-1]["colRelatedSite"] != "") {
        let colSite = relatedUrls[colKeyValue-1]["colRelatedSite"].split(",");
        let colLink = relatedUrls[colKeyValue-1]["colRelatedUrl"].split(",");

        for(let i=0; i < colLink.length; i++) {
            let pElement = document.createElement('p');
            pElement.className = "colLink" + i;
            pElement.innerHTML = colSite[i] + "  <a href=" + colLink[i] + " target='_blank'> ( " + colLink[i] + " )</a>";
            document.getElementById("colLink").append(pElement);
        }
    }
}

function createMediaElement(element, colKeyValue, elementClassName) {   
    //media(img, iframe, audio(audio/mpeg, audio/ogg), video(video/mp4, video/ogg) )
    let media;
    if(contentsMedia[colKeyValue-1]["colMediaType"] == "IMG") {
        media = document.createElement("img");
        media.setAttribute('src', contentsMedia[colKeyValue-1]["colMediaUrl"]);
        media.setAttribute('alt', data[colKeyValue-1]["colTitle"]);
    }else if(contentsMedia[colKeyValue-1]["colMediaType"] == "IFRAME") {
        media = document.createElement("iframe");
        media.setAttribute('src', contentsMedia[colKeyValue-1]["colMediaUrl"]);
        media.setAttribute('frameborder', "0");
        media.setAttribute('allow', "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        media.setAttribute('allowfullscreen', "true");
    }else {
        if(contentsMedia[colKeyValue-1]["colMediaType"] == "audio/mpeg" ||
            contentsMedia[colKeyValue-1]["colMediaType"] == "audio/ogg" ) {
            media = document.createElement("audio");
            media.setAttribute('controls', "controls");
        }else if(contentsMedia[colKeyValue-1]["colMediaType"] == "video/mp4" ||
                    contentsMedia[colKeyValue-1]["colMediaType"] == "video/ogg" ) {
            media = document.createElement("video");
            media.setAttribute('controls', "controls");
        //  media.setAttribute('poster', "");

            source = document.createElement("source");
            source.setAttribute('type', contentsMedia[colKeyValue-1]["colMediaType"]);
            media.appendChild(source);
        }
    }

    media.className = elementClassName;
    element.appendChild(media);
}

function addComment(form) {

    let colKeyValue = form.elements["colKeyValue"].value;
    let colComment = form.elements["colComment"].value;

    //console.log(colKeyValue);
    //console.log(colComment);

    userComments[colKeyValue-1]["colComment"] += "," + colComment;
    //console.log(userComments[colKeyValue-1]["colComment"]);
    document.getElementById("colReview").innerHTML += colComment + "<br>";
}
