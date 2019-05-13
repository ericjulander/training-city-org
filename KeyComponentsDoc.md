# Key Components Doc for <Project>
#### *Author: Eric Julander*
#### *Date: 5/13/2019*

# Preliminary Design

## Magic Box Chart

![alt text](./project-capture.jpg)

<!-- Think through the process as much as makes sense, and then create a magic box chart with the whiteboard and place it here. -->

## Explanation of Design
<!-- Add explanation of the Magic Boxes image above. Answers to the prompts below may also be appropriate to include here. -->
The program has one main function called "consolidateCSVData". It will reorganize data from the CSV array and format it into a hierarchical object after the format displayed in the [Project Capture Document](./ProjectCaptureDoc.md/). It also uses two sort functions to sort the cities by population and the states/countries by alphabetical order.

We use three basic functions to put the object into the hierarchical format:
> ## consolidateByKey (objectArray, sortingKey)
It reduces an array of objects into one object where sub-objects who share the same value at the specified key are grouped together in an array. These arrays are stored in the reduced object under a key named after their common value. 
#### Parameters:
> objectArray: The array of objects to consolidate into one obhject with multiple sub-arrays.

>sortingKey: The key to sort the objects common values by.

##### Returns:
It returns a consolidated object in the following format: 
```json
{ 
  "value1":
         [ { "sortingKey": "value1", "foo":"bar" },
           { "sortingKey": "value1", "foo":"bar" } ],
  "value2":
         [ { "sortingKey": "value2", "foo":"bar" },
           { "sortingKey": "value2", "foo":"bar" } ] 
}
```



#### Example:
```javascript
var states = [{
        "State Name": "State1",
        "Name": "City1",
        "Population": "12345"
    },
    {
        "State Name": "State2",
        "Name": "City1",
        "Population": "54321"
    }, {
        "State Name": "State1",
        "Name": "City2",
        "Population": "24680"
    },
    {
        "State Name": "State2",
        "Name": "City2",
        "Population": "86420"
    }
]



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

console.log(consolidateByKey(states, "State Name"));
/*
{ 
    State1:
     [ 
         { 'State Name': 'State1', Name: 'City1', Population: '12345' },
         { 'State Name': 'State1', Name: 'City2', Population: '24680' } 
     ],
    State2:
     [ 
       { 'State Name': 'State2', Name: 'City1', Population: '54321' },
       { 'State Name': 'State2', Name: 'City2', Population: '86420' } 
     ] 
}
*/
console.log(consolidateByKey(states, "Name"));
/*
{ 
    City1:
     [ 
         { 'State Name': 'State1', Name: 'City1', Population: '12345' },
         { 'State Name': 'State2', Name: 'City1', Population: '54321' }
     ],
    City2:
     [ 
      
       { 'State Name': 'State1', Name: 'City2', Population: '24680' }, 
       { 'State Name': 'State2', Name: 'City2', Population: '86420' } 
     ] 
}
*/
```

> ## createHarchObject(object2Reduce, arrayName)
This takes the consolidated object and transfroms it into a hierarchical format.
#### Parameters:
> object2Reduce: The object to put in the harch format.

>arrayName: The name of the key to store the array in.
 
#### Returns:
Returns a hierarchical object looking like this:
```json
{
    "name": "The objects key",
    "values": "Array of sub-objects"    
}
```

#### Example:
```javascript
var states =

    {
        State1: [{
                'State Name': 'State1',
                Name: 'City1',
                Population: '12345'
            },
            {
                'State Name': 'State1',
                Name: 'City2',
                Population: '24680'
            }
        ],
        State2: [{
                'State Name': 'State2',
                Name: 'City1',
                Population: '54321'
            },
            {
                'State Name': 'State2',
                Name: 'City2',
                Population: '86420'
            }
        ]
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

console.log(createHarchObject(states, "cities"))
/* 
[ { 
  name: 'State1', 
  cities: [ 
            { 'State Name': 'State1', Name: 'City1', Population: '12345' },
            { 'State Name': 'State1', Name: 'City2', Population: '24680' }
          ] 
},
{ 
  name: 'State2', 
  cities: [ 
            { 'State Name': 'State2', Name: 'City1', Population: '54321' },
            { 'State Name': 'State2', Name: 'City2', Population: '86420' }  
          ]  
} 
]
*/
```
> ## cleanCityData(city)
This function takes the city object and strips it down to just its name and poulation. 

#### Parameters:
> city: The city object created by the csv file. 

#### Returns:
The stripped city object in this format:
```json
{
    "Name": "city name",
    "Population": "city population"
}
``` 

> ## determineNumbericOrder(number, number2Compare)
#### Parameters:
>number: the number you would like to determine the order for.

>number2Compare: the number to compare the first number with.

#### Returns:
The stripped city object in this format:
   | |
---|---|
-1  | The number is less than the compared number
0  | The Value is the same as the compared number 
1  | The Value is the same as the compared number 

### Used Libraries 

## Things to Consider Before Getting Project Approved
- Are there any approved libraries that I can use? [Link to Approved Library List]
- Are there design patterns that will help?  [Link to Design Patterns]
- Can I design it so that it is a general tool instead of a specific solution?
- How can it be easily expanded?
- What does the minimum viable product look like?

## Prep for Learning Phase
- What do I need to learn
- How will I learn it
- What will I do to learn it (prototypes/tutorials/research time limit?)
- What is the definition of done for my learning process
- How do I measure the progress of learning
- Is there a deliverable that can be created during the learning process?

-----

#### *Preliminary Design Approved By:* 
#### *Preliminary Design Approval Date:*

# Full Design

## Component Diagrams
<!-- Diagrams and companion explanations for all Key Components.
These would include information about inputs, outputs, and what a function does for every major function. -->

<!-- For each component, the following template will be followed: (In other words, the template below will repeat for each component)-->

### *Insert Component name here*

Diagram:

*Insert Diagram Here*

Explanation:

*Insert Explanation here*

<!-- For a future release:
## Test Plans
For each major function the test plan template will be as follows (in other words the template below will repeat for each test) 
### *Insert name of component here (e.g. convertIdToCourseObject function)*
#### Test 1: *Insert Test name here*
Summary: 
 *Insert Test Summary Here*
 Type: *Insert Type here (Unit Test, Manual Test, Selenium/Puppeteer test (Overkill?))* 
Procedure:
1. *Insert Steps here*
1. *and here*
1. *and here*
Expected Outcome:
*Insert Expected Outcome here*
-->

## Test Plans

### *Insert Module Name Here*
#### How to Test:





-----

#### *Full Design Approved By:* 
#### *Full Design Approval Date:*


<!-- Diagram Types:
 - Data Flow (I think this will be the most popular)
 - Structure Charts (This is really good for showing input and output of every function)
 - UML Class Diagram (a must for object oriented projects) -->



