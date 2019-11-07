var resultJson;

function search() {
    document.getElementById("button").innerHTML = "";
    var search_id = document.getElementById("searchKey").value;
    var x = new XMLHttpRequest();
    var url = " http://www.omdbapi.com/?s=";
    x.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            // console.log("zzzzzzzzzzzzzzz" + this.responseText);
            resultJson = this.responseText;
            resultJson = JSON.parse(resultJson);
            var length = resultJson["Search"].length;
            // console.log(length);
            document.getElementById("resultset").innerHTML = "";
            for (var i = 0; i < 6 && i < length; i++) {
                var movieTitle = "\"" + resultJson["Search"][i]["Title"] + "\"";
                // console.log(movieTitle);
                document.getElementById("resultset").innerHTML += "<div id='grid_Id' onclick='storeParam(" + movieTitle + ")' style='   background-color: Floralwhite; border:1px solid black; padding: 20px; font-size: 30px; text-align: center;'><a href='MovieDetail.html' >" + resultJson["Search"][i]["Title"] + "</a></div>";

            }
            sessionStorage.setItem("movResults", document.getElementById("resultset").innerHTML);
            console.log("oi");
            var movieResults = sessionStorage.getItem("movResults");
            console.log(movieResults);
            if (length > 6) {
                document.getElementById("button").innerHTML += "<button onclick = 'readMore() '  class='w3-button w3-block w3-re' style='width:100%'> <span>SHOW MORE</span>  </button>"
            }

            var title = resultJson;
            console.log(title);


        }
    }

    x.open("GET", url + search_id + "&apikey=a224e3c8", true);
    x.send();
}

function readMore() {
    var length = resultJson["Search"].length;
    //document.getElementById("resultset").innerHTML = "";
    for (var i = 6; i < length; i++) {
        var movieTitle = "\"" + resultJson["Search"][i]["Title"] + "\"";
        // console.log(movieTitle);
        document.getElementById("resultset").innerHTML += "<div id='grid_Id' onclick='storeParam(" + movieTitle + ")' style='   background-color:  Floralwhite; border:1px solid black; padding: 20px; font-size: 30px; text-align: center;'><a href='MovieDetail.html' >" + resultJson["Search"][i]["Title"] + "</a></div>";
    }
    document.getElementById("button").innerHTML = "";
    document.getElementById("button").innerHTML = "<button   class='w3-button w3-block w3-re' style='width:100%'> <span>SHOW LESS</span>  </button>"

}


function storeParam(movName) {

    sessionStorage.setItem("titlekey", movName);
}

function goBack() {
    window.history.back();

    var movieResults = sessionStorage.getItem("movResults");
    document.getElementById("button").innerHTML = movieResults;
    console.log(movResults);

}

function detailsPage() {
    var movName = sessionStorage.getItem("titlekey")
    var x = new XMLHttpRequest();
    var url = " http://www.omdbapi.com/?t=";
    x.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // console.log("zzzzzzzzzzzzzzz" + this.responseText);
            var resultJson = this.responseText;
            resultJson = JSON.parse(resultJson);
            //var length = resultJson["Search"].length;
            // console.log(length);
            var movDoc = document.getElementById("movieList");
            movDoc.innerHTML += "Title :" + resultJson["Title"] + "<br>";
            movDoc.innerHTML += "Type :" + resultJson["Type"] + "<br>";
            movDoc.innerHTML += "Website :" + resultJson["Website"] + "<br>";
            movDoc.innerHTML += "Writer :" + resultJson["Writer"] + "<br>";
            movDoc.innerHTML += "Year :" + resultJson["Year"] + "<br>";
            movDoc.innerHTML += "imdbID :" + resultJson["imdbID"] + "<br>";
            movDoc.innerHTML += "imdbRating :" + resultJson["imdbRating"] + "<br>";
            movDoc.innerHTML += "Title :" + resultJson["imdbRating"] + "<br>";
            movDoc.innerHTML += "imdbVotes :" + resultJson["imdbVotes"] + "<br>";
            movDoc.innerHTML += "Released :" + resultJson["Released"] + "<br>";
            movDoc.innerHTML += "Runtime :" + resultJson["Runtime"] + "<br>";
            movDoc.innerHTML += "Type :" + resultJson["Type"] + "<br>";

        }
    }
    x.open("GET", url + movName + "&apikey=a224e3c8", true);
    x.send();

}