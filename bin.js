/************************************************************************* 
 * Libraries / Requires / Constants
 *************************************************************************/
const {
    main
} = require('./main.js');
const [d3, fs, stripBom, stringify] = [require("d3-dsv"), require("fs"), require("strip-bom"), require("json-stringify-pretty-compact")];

/*
 * Reads data from a csv file and then turns it into an object array
 */
function importCSVData(path) {
    return d3.csvParse(stripBom(fs.readFileSync(path, "utf8")));
}

/************************************************************************* 
 * Input Function
 * Takes 2 arguments from the commandline
 * 1: The path of the csv file to read
 * 2: The path of the JSON file to write
 *************************************************************************/
function getInput(callback) {
    var input = [].concat(process.argv).slice(2, 4);
    // How to get input, eg. from file, commandline, inquierer, etc

    // no csv file path specified
    if (input[0] === undefined || !/(\.csv)/i.test(input[0])) {
        callback("Please enter the path of the csv file you would like to read! Be sure to include the .csv extention.", null);
        return;
    }
    // no output file path specified
    if (input[1] === undefined || !/(\.json)/i.test(input[1])) {
        callback("Please enter the path of the JSON file you would like to write to! Be sure to include the .json extention", null);
        return;
    }


    callback(null, {
        csvPath: input[0],
        writePath: input[1]
    });
    return;
}

/************************************************************************* 
 * Output Function
 * If it is complicated, consider move it to a seperate file.
 *************************************************************************/
function makeOutput(path, data, callback) {
    exportConsolidatedDataToJSON(path, data);
    callback(null);
    return;
}

/************************************************************************* 
 * Handle Error Function
 * If it is complicated, consider moving it to a seperate file.
 *************************************************************************/
function errorHandling(error) {
    console.error(error);
    return;
}

/*
 * Prints the consolidated data to a JSON file
 */
function exportConsolidatedDataToJSON(path = "./output.txt", consolidatedObject, encoding = "utf8") {
    fs.writeFileSync(path, stringify(consolidatedObject), encoding);
}


/************************************************************************* 
 * Start
 *************************************************************************/
// call input
getInput(function (errInput, inputData) {
    if (errInput) {
        errorHandling(errInput);
        return;
    }

    var citiesData = [].concat(importCSVData(inputData.csvPath));

    // call main with the inputData
    main(citiesData, function (errMain, mainData) {
        if (errMain) {
            errorHandling(errMain);
            return;
        }
        // call output with the mainData
        makeOutput(inputData.writePath, mainData, errorHandling);
    });
});