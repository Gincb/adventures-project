const link = "https://spreadsheets.google.com/feeds/list/1SQeili57IfygzYF7DD56KJAniwXYIeGCbWZdphcn0Ds/od6/public/values?alt=json";
    window.addEventListener("DOMContentLoaded", getData);

    function getData() {
        fetch(link)
        .then(res=>res.json())
        .then(handleData);
    }

    function handleData(data) {
        const myData = data.feed.entry;
        console.log(myData);
        myData.forEach(showData);
    }

    function showData(singleRowData) {
        console.log(singleRowData.gsx$location.$t, " - ", singleRowData.gsx$price.$t, ", ",singleRowData.gsx$name.$t); //test

        const template = document.querySelector("template").content;
        const myClone = template.cloneNode(true);

        myClone.querySelector(".card-image").style.backgroundImage = `url(${singleRowData.gsx$imageurl.$t})`;

        myClone.querySelector(".card-price span").textContent =
            singleRowData.gsx$price.$t;

         myClone.querySelector(".card-title").textContent =
            `${singleRowData.gsx$name.$t}, ${singleRowData.gsx$location.$t}`;
           myClone.querySelector(".card-description").textContent =
            singleRowData.gsx$shortdescription.$t;

        if(singleRowData.gsx$rating.$t == 5) {
            myClone.querySelector(".rating").innerHTML = `<i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i>`;
        } else if(singleRowData.gsx$rating.$t == 4) {
            myClone.querySelector(".rating").innerHTML = `<i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i>`;
        } else if (singleRowData.gsx$rating.$t == 3){
            myClone.querySelector(".rating").innerHTML = `<i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i>`
        } else if (singleRowData.gsx$rating.$t == 2){
            myClone.querySelector(".rating").innerHTML = `<i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i>`
        }else{
            myClone.querySelector(".rating").innerHTML = `<i class="fas fa-star star-icon"></i>`
        }




        const place = document.querySelector(".container");
        place.appendChild(myClone);

    }
