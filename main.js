const [d3, fs, stripBom, stringify] = [require("d3-dsv"), require("fs"), require("strip-bom"), require("json-stringify-pretty-compact")];

/*
 * Reads data from a csv file and then turns it into an object array
 */
function importCSVData(path) {
    return d3.csvParse(stripBom(fs.readFileSync(path, "utf8")));
}

/*
 * Creates arrays by sorting specific keys within an object
 */
function consolidateByKey(objectArray, sortingKey) {
    return objectArray.reduce(function (consolidatedObject, object2Sort) {
        var depositArray = consolidatedObject[object2Sort[sortingKey]];
        consolidatedObject[object2Sort[sortingKey]] = (depositArray !== undefined) ? [].concat(depositArray, object2Sort) : object2Sort;
        return consolidatedObject;
    }, {});
}


function createNameWithArrayObject(object2Reduce, arrayName = "values") {
    var newArray = [];
    for (var i in object2Reduce) {
        var tempObject = {};
        tempObject["name"] = i;
        tempObject[arrayName] = object2Reduce[i];
        newArray.push(tempObject);
    }
    return newArray;
}



function cleanCityData(city) {
    return {
        name: city.Name,
        population: city.Population
    }
}

/*
 * Consolidates the object array into one multi-dimensional object
 */
function consolidateCSVData(csvData) {
    var consolidatedObject = consolidateByKey(csvData, "Country Name");
    var regions = createNameWithArrayObject(consolidatedObject, "states");
    var completeData = regions.map(function (region) {
        var stateList = consolidateByKey(region.states, "State Name");
        var states = createNameWithArrayObject(stateList, "cities").map(function (state) {
            state.cities = state.cities.map(cleanCityData);
            return state;
        });
        region.states = states;
        return region;
    });

    return completeData;

}

/*
 * Prints the consolidated data to a JSON file
 */
function exportConsolidatedDataToJSON(consolidatedObject, path = "./output.txt", encoding = "utf8") {
    fs.writeFileSync(path, stringify(consolidatedObject), encoding);
}

(function () {
    // convert the csv data to an array from an object
    var csvData = [].concat(importCSVData("./citiesData.csv"));
    var completeData = consolidateCSVData(csvData);
    exportConsolidatedDataToJSON(completeData, "./cities/cities.json");
})()