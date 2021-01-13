// JavaScript source code



function SetCSVData(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    var text = reader.readAsText(file);

    reader.onload = function (event) {
        let CSVDATA = reader.result;
        ParseData(CSVDATA);
    }
}

let DataArray = new Array();
let KeyArrays = new Array();

function ParseData(csvData) {
    var lines = csvData.split('\n');
    
    var result = lines.map(function (line) {
        
        return line.split(',');
    });

    DataArray = result;

    for (var i = 0; i < DataArray[0].length; i++) {
        KeyArrays[i] = DataArray[0][i];
    }

    DisplayKeys();
    DisplayCSV(DataArray);

}

function DisplayKeys() {
    const par = document.getElementById("SortByContainer");
    par.innerHTML = "";

    for (var i = 0; i < KeyArrays.length; i++) {
        const button = document.createElement('button');

        button.innerHTML = "Sort By: " + KeyArrays[i];

        button.id = i;

        button.onclick = function () {

            SortData(button.id);

        };

        par.appendChild(button);
    }
}

function DisplayCSV(data) {

    const parent = document.getElementById("csvDataContainer");

    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }

    var table = document.createElement('table');
    var tBody = document.createElement('tbody');
    for (var y = 0; y < data.length - 1; y++) {
        var row = document.createElement('tr');
        for (var x = 0; x < data[y].length; x++) {
            var cell = document.createElement('td');

            if (data[y][x].includes("miss")) {
                cell.appendChild(document.createTextNode("NaN"));
            }
            else {
                cell.appendChild(document.createTextNode(data[y][x]));
            }
            row.appendChild(cell);
        }
        tBody.appendChild(row);
    }
    table.appendChild(tBody);

    parent.appendChild(table);

}

function SortData(key) {
    var toString = Object.prototype.toString;
    //var isString = toString.call(DataArray[1][key]) == '[object String]';

    var y = 1;
    while (DataArray[y][key] == "") {
        y++;
    }
    var isString = isNaN(DataArray[y][key])

    console.log(isString);
    if (isString) {
        let length = DataArray.length;
        while (length > 0) {

            for (var y = 1; y < length - 1; y++) {

                var left = DataArray[y][key];
                var right = DataArray[y + 1][key];

                if (left > right) {


                    for (var i = 0; i < DataArray[y].length; i++) {


                        var temp = DataArray[y + 1][i];


                        DataArray[y + 1][i] = DataArray[y][i];


                        DataArray[y][i] = temp;


                    }
                }

            }
            length--;
        }
    }
    else {
        let length = DataArray.length;

        while (length > 0) {

            for (var y = 1; y < length - 1; y++) {

                if (DataArray[y][key] == "" || isNaN(DataArray[y][key])) {
                    DataArray[y][key] = -1000000 + "miss";
                }

                var left = parseFloat(DataArray[y][key]);
                var right = parseFloat(DataArray[y + 1][key]);


                if (left > right) {


                    for (var i = 0; i < DataArray[y].length; i++) {


                        var temp = DataArray[y + 1][i];


                        DataArray[y + 1][i] = DataArray[y][i];


                        DataArray[y][i] = temp;


                    }
                }

            }
            length--;
        }
    }



    DisplayCSV(DataArray);

    ShowDownloadButton();
}

function ShowDownloadButton() {

    const par = document.getElementById("finalizeContainer");
    if (par.childElementCount == 0) {
        var button = document.createElement("button");

        button.onclick = function () {

            DownloadAsCSV();

        };

        button.id = "DownloadBut";

        button.innerHTML = "Save";

        par.append(button);
    }
}

function DownloadAsCSV() {


    var lineArray = [];
    DataArray.forEach(function (infoArray, index) {
        var line = infoArray.join(",");
        lineArray.push(index == 0 ? "data:text/csv;charset=utf-8," + line : line);
    });
    var csvContent = lineArray.join("\n");

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link);

    link.click();


}
