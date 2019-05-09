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

function createHarchObject(object2Reduce, arrayName = "values") {
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
        population: parseInt(city.Population)
    }
}

/*
 * determines if the 1 item comes before or after the second numerically (1 = after, -1 = before, 0 = same )
 */
function determineNumbericOrder(number, number2Compare) {
    return (number - number2Compare) / Math.abs(number - number2Compare) || 0;
}
/*
 * Array function that sorts two strings alphabetically 
 */
function determineAlphOrder(string1, string2) {
    var length = (string1.length < string2.length) ? string1.length : string2.length;
    var pos;
    // loops until it finds the correct placenment for the specified work
    for (var i = 0; i < length; i++) {
        // gets the the character at the specified position in the array
        var [c1, c2] = [string1.charCodeAt(i), string2.charCodeAt(i)];
        // determines the correct order of the two items
        pos = determineNumbericOrder(c1, c2);
        //leaves the loop when it finds one character that is different and places it
        if (pos !== 0) break;
    }
    return pos;
}



function sortHarchObjectAlph(object1, object2) {
    return determineAlphOrder(object1.name, object2.name);
}

/*
 * Consolidates the object array into one multi-dimensional object
 */
function consolidateCSVData(csvData) {
    var consolidatedObject = consolidateByKey(csvData, "Country Name");
    var countries = createHarchObject(consolidatedObject, "states");
    var completeData = countries.map(function (country) {
        var stateList = consolidateByKey(country.states, "State Name");
        var states = createHarchObject(stateList, "cities").map(function (state) {
            state.cities = state.cities.map(cleanCityData).sort(function (cityA, cityB) {
                return determineNumbericOrder(cityA.population, cityB.population);
            })
            return state;
        }).sort(sortHarchObjectAlph);
        country.states = states;
        return country;
    }).sort(sortHarchObjectAlph);

    return completeData;
}

/*
 * data is an object with two keys:
 * csvPath - the path of the cities csv file to extract
 * 
 */
function main(citiesData, callBack) {
    // convert the csv data to an array from an object
    return callBack(null, consolidateCSVData(citiesData))
}

module.exports = {
    main
};