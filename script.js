//-----------------DISPLAY ALL FILMS SCRIPT---------------//
// XML DISPLAY
function showDisplayXmlFilmInfo(responseText) {
    var xmlDocument = responseText;
    var films = xmlDocument.getElementsByTagName("item");
    var rows = new Array(films.length);
    var subElementNames = ["filmId", "filmTitle", "filmYear", "filmDirector", "filmStars", "filmReview"];
    for (var i = 0; i < films.length; i++) {
        rows[i] = getElementValues(films[i], subElementNames);
    }
    var table = getTableForDisplayAllFilms(rows, subElementNames);
    htmlInsert("json-xml-div", table);
}

function showDisplayStringFilmInfo(responseText) {
    var films = responseText.split(";;");
    var rows = new Array(films.length - 1);
    var subElementNames = ["filmId", "filmTitle", "filmYear", "filmDirector", "filmStars", "filmReview"];
    for (var i = 0; i < films.length - 1; i++) {
        rows[i] = {};
        rows[i]["filmId"] = films[i].split("--")[0].split("::")[1];
        rows[i]["filmTitle"] = films[i].split("--")[1].split("::")[1];
        rows[i]["filmYear"] = films[i].split("--")[2].split("::")[1];
        rows[i]["filmDirector"] = films[i].split("--")[3].split("::")[1];
        rows[i]["filmStars"] = films[i].split("--")[4].split("::")[1];
        rows[i]["filmReview"] = films[i].split("--")[5].split("::")[1];
    }
    var table = getTableForDisplayAllFilms(rows, subElementNames);
    htmlInsert("json-xml-div", table);
}

function getBodyContent(element) {
    element.normalize();
    return (element.childNodes[0] ? element.childNodes[0].nodeValue : "");
}

function getElementValues(element, subElementNames) {
    var values = {};
    for (var i = 0; i < subElementNames.length; i++) {
        var name = subElementNames[i];
        var subElement = element.getElementsByTagName(name)[0];
        values[name] = getBodyContent(subElement);
    }
    return (values);
}

function htmlInsert(id, table) {
    document.getElementById(id).innerHTML = table;
}

function getTableBody(rows, subElementNames) {
    var body = "";
    for (var i = 0; i < rows.length; i++) {
        body += "  <tr>";
        var row = rows[i];
        for (var j = 0; j < Object.keys(row).length; j++) {
            body += "<td>" + row[subElementNames[j]] + "</td>";
        }
        body += "</tr>\n";
    }
    return (body);
}

function getTableForDisplayAllFilms(rows, subElementNames) {
    var table = "" +
        "<h1 class=\"text-center\">Display all Films</h1>\n" +
        "<table border='1' align='center'>\n" +
        "<tr bgcolor='00FF7F'>" +
        `<th><b>${subElementNames[0]}</b></th>` +
        `<th><b>${subElementNames[1]}</b></th>` +
        `<th><b>${subElementNames[2]}</b></th>` +
        `<th><b>${subElementNames[3]}</b></th>` +
        ` <th><b>${subElementNames[4]}</b></th>` +
        ` <th><b>${subElementNames[5]}</b></th>` +
        "  </tr>" +
        getTableBody(rows, subElementNames) +
        "</table>";
    return (table);
}

//JSON DISPLAY
function showJsonDisplayAllFilmsInfo(responseText) {
    var rawData = responseText;
    var subElementNames = ["filmId", "filmTitle", "filmYear", "filmDirector", "filmStars", "filmReview"];
    var table = getTableForDisplayAllFilms(rawData, subElementNames);
    htmlInsert("json-xml-div", table);
}

// When HTML DOM "click" event is invoked on element with ID "getFilmsBtn", execute the following function...
$(document).on("click", "#getFilmsBtn", function () {
    $("#json-xml-div").empty();
    $("#loading").show();
    var format = $("#format").val();
    $.get("http://localhost:8081/film/getAllFilms", "format=" + format, function (responseText) {
        $("#loading").hide();
        if (format === 'json') {
            showJsonDisplayAllFilmsInfo(responseText);
        } else if (format === 'xml') {
            showDisplayXmlFilmInfo(responseText);
        } else if (format == 'string') {
            showDisplayStringFilmInfo(responseText);
        }
        $("#json-xml-div").show();
        $("#json-xml-div").text();
    });
});

//-----------------SEARCH FILMS SCRIPT---------------//
// XML DISPLAY
function showSearchXmlFilmInfo(responseText) {
    var xmlDocument = responseText;
    var films = xmlDocument.getElementsByTagName("item");
    var rows = new Array(films.length);
    var subElementNames = ["filmId", "filmTitle", "filmYear", "filmDirector", "filmStars", "filmReview"];
    for (var i = 0; i < films.length; i++) {
        rows[i] = getElementValues(films[i], subElementNames);
    }
    var table = getSearchFilmTable(rows, subElementNames);
    htmlInsert("json-xml-div", table);
}

function getSearchFilmTable(rows, subElementNames) {
    var table = "" +
        "<h1 class=\"text-center\">Display Searched Film</h1>\n" +
        "<table border='1'  align='center'>\n" +
        "<tr bgcolor='00FF7F'>" +
        `<th><b>${subElementNames[0]}</b></th>` +
        `<th><b>${subElementNames[1]}</b></th>` +
        `<th><b>${subElementNames[2]}</b></th>` +
        `<th><b>${subElementNames[3]}</b></th>` +
        ` <th><b>${subElementNames[4]}</b></th>` +
        ` <th><b>${subElementNames[5]}</b></th>` +
        "  </tr>" +
        getTableBody(rows, subElementNames) +
        "</table>";
    return (table);
}

//JSON DISPLAY
function showSearchJsonFilmInfo(responseText) {
    var rawData = responseText;
    var subElementNames = ["filmId", "filmTitle", "filmYear", "filmDirector", "filmStars", "filmReview"];
    var table = getSearchFilmTable(rawData, subElementNames);
    htmlInsert("json-xml-div", table);
}

$(document).on("click", "#submitBtn", function () {

    var format = $("#format").val();
    var filmTitle = $("#filmTitleTextBox").val();
    var filmId = $("#filmIdTextBox").val();

    if ($("#filmTitleTextBox").is(':disabled')) {
        filmTitle = null;
    } else {
        filmId = null;
    }

    if (!filmTitle && !filmId) {
        alert("Enter value to continue")
        return;
    }
    $("#json-xml-div").empty();
    $("#loading").show();
    var params = filmTitle ? "filmTitle=" + filmTitle : "filmId=" + filmId;
    var format = $("#format").val();
    $.get("http://localhost:8081/film/getFilm", params + "&format=" + format, function (responseText) {
        $("#loading").hide();
        if (format === 'json') {
            showSearchJsonFilmInfo(responseText);
        } else if (format === 'xml') {
            showSearchXmlFilmInfo(responseText);
        } else if (format == 'string') {
            showDisplayStringFilmInfo(responseText);
        }

        $("#json-xml-div").show();
        $("#json-xml-div").text();
    });
});
$(document).ready(function () {
    $("#json-xml-div").hide();
    $("#loading").hide();
});

function hideFilmTitle(x) {
    if (x.checked) {
        document.getElementById('filmTitleTextBox').disabled = true;
        document.getElementById('filmIdTextBox').disabled = false;
    }
}

function hideFilmId(x) {
    if (x.checked) {
        document.getElementById('filmIdTextBox').disabled = true;
        document.getElementById('filmTitleTextBox').disabled = false;
    }
}


//-----------------INSERT FILMS SCRIPT---------------//
function getTable(responseText) {
    var table = "" +
        "<h1 class=\"text-center\">Insert Film</h1>\n" +
        "<table border='1' align='center'>\n" +
        "<tr bgcolor='00FF7F'>" +
        "<th><b>" + (responseText) + "</b></th>" +
        "</tr>" +
        "</table>";

    return (table);
}

function showSuccessXMLFilm(responseText) {
    var xmlDocument = responseText;
    var response = xmlDocument.getElementsByTagName("response");
    var outputText = response[0].textContent;

    var table = getTable(outputText);
    htmlInsert("json-xml-div", table);
}

function showSuccessStringFilm(responseText) {
    var table = getTable(responseText);
    htmlInsert("json-xml-div", table);
}

//JSON DISPLAY
function showSuccessJsonFilmInfo(responseText) {
    var rawData = responseText;
    var table = getTable(rawData["response"]);

    htmlInsert("json-xml-div", table);
}

jQuery(document).on("click", "#btnSubmit", function () {
        var format = $("#format").val();
        var filmTitle = $("#filmTitle").val();
        var filmYear = $("#filmYear").val();
        var filmDirector = $("#filmDirector").val();
        var filmStars = $("#filmStars").val();
        var filmReview = $("#filmReview").val();

        if (filmTitle == "" || filmYear == "" || filmDirector == "" || filmStars == "" || filmReview == "") {
            alert("Please insert a value in all fields to continue")
            return;
        }

        $("#json-xml-div").empty();
        $("#loading").show();

        var film = {
            "filmTitle": filmTitle,
            "filmYear": filmYear,
            "filmDirector": filmDirector,
            "filmStars": filmStars,
            "filmReview": filmReview
        }
        $.post("http://localhost:8081/film/insert-film" + "?format=" + format, film, function (responseText) {
            $("#loading").hide();
            if (format === 'json') {
                showSuccessJsonFilmInfo(responseText);
            } else if (format === 'xml') {
                showSuccessXMLFilm(responseText);
            } else {
                showSuccessStringFilm(responseText)
            }
            $("#json-xml-div").show();
            $("#json-xml-div").text();
        });
    }
);
$(document).ready(function () {
    $("#json-xml-div").hide();
    $("#loading").hide();
});


//-----------------UPDATE FILMS SCRIPT---------------//
function getUpdateFilmTable(responseText) {
    var updateTable = "" +
        "<h1 class=\"text-center\">Update Film</h1>\n" +
        "<table border='1' align='center'>\n" +
        "<tr bgcolor='00FF7F'>" +
        "<th><b>" + (responseText) + "</b></th>" +
        "</tr>" +
        "</table>";
    return (updateTable);
}

function showSuccesUpdateXMLFilm(responseText) {
    var xmlDocument = responseText;
    var response = xmlDocument.getElementsByTagName("response");
    var outputText = response[0].textContent;

    var XMLtable = getUpdateFilmTable(outputText);
    htmlInsert("json-xml-div", XMLtable);
}

//JSON DISPLAY
function showSuccessUpdateJsonFilmInfo(responseText) {
    var rawData1 = responseText;
    var Jsontable = getUpdateFilmTable(rawData1["response"]);

    htmlInsert("json-xml-div", Jsontable);
}

jQuery(document).on("click", "#submitUpdateBtn", function () {
    var format = $("#format").val();
    var filmId = $("#filmId").val();
    var filmTitle = $("#filmTitle").val();
    var filmYear = $("#filmYear").val();
    var filmDirector = $("#filmDirector").val();
    var filmStars = $("#filmStars").val();
    var filmReview = $("#filmReview").val();

    if (filmId == "" || filmTitle == "" || filmYear == "" || filmDirector == "" || filmStars == "" || filmReview == "") {
        alert("Please insert a value in all fields to continue")
        return;
    }
    $("#json-xml-div").empty();
    $("#loading").show();


    $.ajax({
        url: 'http://localhost:8081/film/update-film' + "?filmId=" + filmId + "&filmTitle=" + filmTitle + "&filmYear=" + filmYear + "&filmDirector=" + filmDirector + "&filmStars=" + filmStars + "&filmReview=" + filmReview + "&format=" + format,
        type: 'PUT',
        data: "filmId=" + filmId + "&filmTitle=" + filmTitle + "&filmYear=" + filmYear + "&filmDirector=" + filmDirector + "&filmStars=" + filmStars + "&filmReview=" + filmReview + "&format=" + format,
        success: function (responseText) {
            console.log(responseText);
            $("#loading").hide();
            if (format === 'json' || format === 'html') {
                showSuccessUpdateJsonFilmInfo(responseText);
            } else if (format === 'xml') {
                showSuccesUpdateXMLFilm(responseText);
            } else {
                showSuccessStringFilm(responseText);
            }
            if (format === 'xml' || format === 'json') {
                $("#json-xml-div").show();
                $("#json-xml-div").text();
            }
        }
    });
});

$(document).ready(function () {
    $("#json-xml-div").hide();
    $("#loading").hide();
});


//-----------------DELETE FILMS SCRIPT---------------//

function loadAllFilmsOnDeletePage() {
    $("#json-xml-div").empty();
    $("#loading").show();

    $.get("http://localhost:8081/film/getAllFilms", "format=json", function (responseText) {
        $("#loading").hide();
        showJsonDisplayAllFilmsInfoForDelete(responseText);

        $("#json-xml-div").show();
        $("#json-xml-div").text();
    });
};

function deleteById(element) {
    var id = $(element).attr("id");
    $.ajax({
        url: "http://localhost:8081/film/delete-film?" + "filmId=" + id,
        type: 'DELETE',
        success: function (responseText) {
            showJsonDisplayAllFilmsInfoForDelete(responseText);
            console.log(responseText);
            alert(id + "is successfully deleted");
        }
    });
}

function showJsonDisplayAllFilmsInfoForDelete(responseText) {
    var rawData = responseText;
    var subElementNames = ["filmId", "filmTitle", "filmYear", "filmDirector", "filmStars", "filmReview", "Delete"];
    var table = getTableForDisplayAllFilmsForDelete(rawData, subElementNames);
    htmlInsert("json-xml-div", table);
}

function getTableBodyForDelete(rows, subElementNames) {
    var body = "";
    for (var i = 0; i < rows.length; i++) {
        body += "  <tr>";
        var row = rows[i];
        for (var j = 0; j < Object.keys(row).length; j++) {
            body += "<td>" + row[subElementNames[j]] + "</td>";
        }
        body += "<td><b><button class=\"btn btn-danger\" onclick='deleteById(this)' id =\"" + row[subElementNames[0]] +
            " \" >Delete</button></b></td>";
        body += "</tr>\n";
    }
    return (body);
}

function getTableForDisplayAllFilmsForDelete(rows, subElementNames) {
    var table = "" +
        "<h1 class=\"text-center\">All Films</h1>\n" +
        "<table border='1' align='center'>\n" +
        "<tr bgcolor='00FF7F'>" +
        `<th><b>${subElementNames[0]}</b></th>` +
        `<th><b>${subElementNames[1]}</b></th>` +
        `<th><b>${subElementNames[2]}</b></th>` +
        `<th><b>${subElementNames[3]}</b></th>` +
        ` <th><b>${subElementNames[4]}</b></th>` +
        ` <th><b>${subElementNames[5]}</b></th>` +
        ` <th><b>${subElementNames[6]}</b></th>` +
        "  </tr>" +
        getTableBodyForDelete(rows, subElementNames) +
        "</table>";
    return (table);
}

$(document).ready(function () {
    $("#json-xml-div").hide();
    $("#loading").hide();
});


