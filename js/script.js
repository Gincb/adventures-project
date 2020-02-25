const link = "https://spreadsheets.google.com/feeds/list/1SQeili57IfygzYF7DD56KJAniwXYIeGCbWZdphcn0Ds/od6/public/values?alt=json";
window.addEventListener("DOMContentLoaded", getData);

/***** filter section *****/


function getData() {


    fetch(link)
        .then(res => res.json())
        .then(handleData);

}

function handleData(data) {
    const myData = data.feed.entry;

    const cityBtns = document.querySelectorAll(".city");
    cityBtns.forEach(cityBtn => {
        cityBtn.addEventListener("click", filterContent);

    })

    const mountainBtns = document.querySelectorAll(".mountain");
    mountainBtns.forEach(mountainBtn => {
        mountainBtn.addEventListener("click", filterContent);

    })


    const beachBtns = document.querySelectorAll(".beach");
    beachBtns.forEach(beachBtn => {
        beachBtn.addEventListener("click", filterContent);

    })


        myData.forEach(showData);

    function filterContent(e) {
        console.log(e);
        document.querySelector(".card-headline").textContent = e.currentTarget.className;

        let result = myData.filter(item => item.gsx$category.$t === e.currentTarget.className);
        document.querySelector(".container").innerHTML = "";
        result.forEach(showData);
    }

    function sortList(sortType) {
        //        console.log(myData)
                document.querySelector(".card-headline").textContent = "HOT TOURS";

        if (sortType === "price") {
            myData.sort(function (a, b) {
                return a.gsx$price.$t - b.gsx$price.$t;
                console.log(a, b)
            })
            document.querySelector(".container").innerHTML = "";
        document.querySelector(".card-subheadline").textContent = "Cheapest price first"

            myData.forEach(showData);

            console.log(myData)

        } else if (sortType === "rate") {
            myData.sort(function (a, b) {
                return a.gsx$rating.$t - b.gsx$rating.$t;
            })
            document.querySelector(".container").innerHTML = "";
                    document.querySelector(".card-subheadline").textContent = "Best rating first"

            myData.reverse();
            myData.forEach(showData);

        } else {
            document.querySelector(".container").innerHTML = "";

            myData.forEach(showData);

        }

    }

    const submit = document.getElementById("submitBtn");


    submit.addEventListener("click", select)

    function select() {
        const options = document.querySelectorAll("option");
        options.forEach(option => {

            if (option.selected) {
                sortList(option.id)
            }
        })
    }

}

function showData(singleRowData) {

    const template = document.querySelector("template").content;
    const myClone = template.cloneNode(true);

    myClone.querySelector(".card-image").style.backgroundImage = `url(${singleRowData.gsx$imageurl.$t})`;

    myClone.querySelector(".card-price span").textContent =
        singleRowData.gsx$price.$t;

    myClone.querySelector(".card-title").textContent =
        `${singleRowData.gsx$name.$t}, ${singleRowData.gsx$location.$t}`;
    myClone.querySelector(".card-description").textContent =
        singleRowData.gsx$shortdescription.$t;

    if (singleRowData.gsx$rating.$t == 5) {
        myClone.querySelector(".rating").innerHTML = `<i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i>`;
    } else if (singleRowData.gsx$rating.$t == 4) {
        myClone.querySelector(".rating").innerHTML = `<i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i>`;
    } else if (singleRowData.gsx$rating.$t == 3) {
        myClone.querySelector(".rating").innerHTML = `<i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i>`
    } else if (singleRowData.gsx$rating.$t == 2) {
        myClone.querySelector(".rating").innerHTML = `<i class="fas fa-star star-icon"></i><i class="fas fa-star star-icon"></i>`
    } else {
        myClone.querySelector(".rating").innerHTML = `<i class="fas fa-star star-icon"></i>`
    }


    const place = document.querySelector(".container");
    place.appendChild(myClone);

}
