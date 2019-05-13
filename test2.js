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