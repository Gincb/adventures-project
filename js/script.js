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
    }