/*
 * It reduces an array of objects into one object where sub-objects 
 * who share the same value at the specified key are grouped together 
 * in an array. These arrays are stored in the reduced object under a key 
 * named after their common value. 
 * Params:
 * objectArray - The array of objects to consolidate into one object with multiple sub-arrays.
 * sortingKey - The key to sort the objects common values by.
 */
function consolidateByKey(objectArray, sortingKey) {
    return objectArray.reduce(function (consolidatedObject, object2Sort) {
        var depositArray = consolidatedObject[object2Sort[sortingKey]];
        consolidatedObject[object2Sort[sortingKey]] = (depositArray !== undefined) ? [].concat(depositArray, object2Sort) : object2Sort;
        return consolidatedObject;
    }, {});
}
/*
 * This takes the consolidated object and transfroms it into a hierarchical format.
 * (See Key Components Document for Details)
 * Params:
 * object2Reduce - The object to put in the harch format.
 * arrayName - The name of the key to store the array in.
 */
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

/*
 * This function takes the city object and strips it down to just its name and poulation. 
 * Params:
 * city - The city object created by the csv file.  
 */
function cleanCityData(city) {
    return {
        name: city.Name,
        population: parseInt(city.Population)
    }
}

/*
 * This is used to generate the return for an Array.sort() method. Useful when tryng to sort two objects by the sub-properties they contain.
 * Params:
 * number - the number you would like to determine the order for.
 * number2Compare - the number to compare the first number with.
 * Returns (1 = after, -1 = before, 0 = same )
 */
function determineNumbericOrder(number, number2Compare) {
    return (number - number2Compare) / Math.abs(number - number2Compare) || 0;
}
/*
 * This is used to generate the return for an Array.sort() method when determining the alphabetic order of two strings. Useful when comparing two sub-properties of objects when sorting them.
 * Note: This is dependent on the determineNumbericOrder function
 * Returns (1 = after, -1 = before, 0 = same )
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


/*
 * A sort function to sort the harch object in alphabetical order.
 */
function sortHarchObjectAlph(object1, object2) {
    return determineAlphOrder(object1.name, object2.name);
}

/*
 * Consolidates the object array into one multi-dimensional object
 */
function consolidateCSVData(csvData) {
    // takes the csv data and puts it into a consolidated object
    var consolidatedObject = consolidateByKey(csvData, "Country Name");
    // takes the array of objects and turns it into a harch object
    var countries = createHarchObject(consolidatedObject, "states");
    // sifts through the countries and turns the states into harch objects and then sorts the countries and in alphabetical order
    var completeData = countries.map(function (country) {
        // separates the states in the countries
        var stateList = consolidateByKey(country.states, "State Name");
        // turns the states into harch objects and sorts them in alphabetical order
        var states = createHarchObject(stateList, "cities").map(function (state) {
            // cleans the city data and then sorts it by population
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