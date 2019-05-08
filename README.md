# Data structure manipulation

## Goals

1. Practice using JavaScript array methods
1. Practice Declarative(What not How) Functional Programming  
1. Practice changing one data structure into another data structure
1. Practice learning a new library from their documentation
1. Practice using the Project Life Cycle
    1. Make a Project Capture Document
    1. Make a Key Component Document

## Task

Convert data from a table data structure in a CSV file to a hierarchical data structure it a JSON file.
	
## Instructions

You will be provided a data set that is in CSV format. A CSV is a text file that stores data in a table format. Like a database table, it has rows and columns. In a CSV text file, each line is row and it uses commas to separate each value in that row. Thus the name, CSV or Comma Separated Values. The first line or row of the file is typically a header row. This row has a string, "header" for each column of the table. Each header describes the data in it's column.  CSV files are typically exported from spreadsheet programs like MS Excel and Google Sheets. Because of the simple and compact nature of the file type, the CSV format is kind of like the JPG format for spreadsheets and database tables. Meaning, it is a generic "middle" file format for spreadsheets.  

For this project, each row describes a city. Each city has four pieces of data, the name of the country it belongs to `Country Name`, the name of the state it belongs to `State Name`, the name of the city it's self `Name` and the city's population `Population`.  There are 100 cities in the list.

The CSV data looks like this:

| Country Name  | State Name| Name        | Population   |
| ------------- | --------- | ----------- | -----------: |
| Country1      | c1_State3 | c1_s3_City4 | 427280       |
| Country2      | c2_State1 | c2_s2_City1 | 465466       |
| ...           | ...       | ...         | ...          |


You will notice a pattern in the names of the countries, states and cities. There are a total of five countries named `Country1` to `Country5`. There are five states in each country. The state is named after the country it belongs to. For example, every state in `Country4` starts with `c4_` and then `State1` through `State5`. The city names follow a similar pattern, being named after the state and country that it belongs to. There are four cities in each state. The data was created this way to make it easy to verify the out put of your code. Even though this is not real data with real names you should treat them like they are real names of countries, states and cities. Meaning you should not use the numbers to transform your data. Treat them like normal strings.

You will need to read in the CSV file and then parse the data into an array of city objects with 4 keys of info. To read in the file just use an appropriate method on `fs`. To parse the CSV string into an array of objects use the `d3-dsv` library. `d3` is a conglomerate of smaller libraries that are used to make really cool data visualizations. Check out the whole library at the [d3 website](https://d3js.org/). We use one of the sub-libraries. It is called `d3-dsv`. It was once called `d3-csv` but there are things called `tsv` "Tab Separated Values" and technically you can use anything to separate the values. The code is the same no matter the separator, you just need to know what separates the data. So he made the code more flexible and renamed it to "dsv" meaning "Delimiter Separated Values". A delimiter is just a character that separates something. You will need to read the library's documentation to figure out how to use the library. Being able to read and figure out someone else's documentation is a key skill in programing. I have some tips but, the skill is really only learned by doing. Here's your chance to get started! (Hint: make sure you don't miss the part in their documentation about the `BOM`, you will need it.) The `d3-dsv` documentation is in their [README.md in the d3-dsv github repository](https://github.com/d3/d3-dsv#d3-dsv). 

Once you have an array of city objects from the d3-dsv library, you will need to change the data structure. This is the real meat of the task. You will need to change the data structure from a 1 dimensional array of cities in to a array of `Country` objects. Each `Country` object will have two properties (or keys), `name` and `states`. The `states` value will be array of `City` objects. Each `City` object will have two properties (or keys), `name` and `population`. This might be known as a hierarchical data structure because `Countries` have `States` and `States` have `Cities`. The array will look something like this.

```JavaScript
[{
    name: "Country1",
    states :[{
            name:"c1_State3",
            cities:[{
                name:"c1_s3_City4",
                population: 427280
            },
			//more City objects that belong to "c1_State3"
			...
			]
    },
	// more State objects that belong to "Country1"
	]
},
// more Country objects
...
];
```

Once you have the array looking like that, you will need to write out a `JSON` file that contains the `JSON` representation of the JavaScript array. To do that, you will once again need an appropriate method on `fs`. And you will need a way to `stringify` (or more technically `serialize`) the object into a string. Use the built in `JSON.stringify()`. [Stringify's documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify). make sure to look at the second and third parameters. Or, if you want, you can use a cool library on NPM called [json-stringify-pretty-compact](https://www.npmjs.com/package/json-stringify-pretty-compact). It `JSON.stringify()` just the same but will keep a objects data on the same line as much as possible. That makes the file a bit more compact and easier to read and check things.

## CSV Files

click link, then click the `raw` button, then right click anywhere and choose `Save as...`.

1. [citiesData.csv](citiesData.csv)  
2. [citiesData1000.csv](citiesData1000.csv) (A Larger data set if you want. 10 countries, 5 states/country, 20 cities/state.)
3. real data (coming)

## Docs

Make sure to create Project Capture and Key Component documents and get them approved before writing any code.
(Talk to us to find the templates if you need help)

## Template

Make sure you use the Plus Sign Design and a start from one of our templates when you make this program.
(Talk to us to find the templates if you need help)

