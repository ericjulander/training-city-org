var foods = [{
        type: "veggie",
        color: "green",
        name: "Broccoli"
    },
    {
        type: "veggie",
        color: "orange",
        name: "Carrot"
    },
    {
        type: "fruit",
        color: "green",
        name: "Green Apple"
    },
    {
        type: "fruit",
        color: "orange",
        name: "Orange"
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

console.log(consolidateByKey(foods, "color"));
/*
{ green:
         [ { type: 'veggie', color: 'green', name: 'Broccoli' },
           { type: 'fruit', color: 'green', name: 'Green Apple' } ],
  orange:
         [ { type: 'veggie', color: 'orange', name: 'Carrot' },
           { type: 'fruit', color: 'orange', name: 'Orange' } ] }
*/
console.log(consolidateByKey(foods, "type"));
/*
{ 
veggie:
        [ { type: 'veggie', color: 'green', name: 'Broccoli' },
          { type: 'veggie', color: 'orange', name: 'Carrot' } ],
  fruit:
        [ { type: 'fruit', color: 'green', name: 'Green Apple' },
          { type: 'fruit', color: 'orange', name: 'Orange' } ] 
     }
*/

var foodTypes =

    {
        veggie: [{
                type: 'veggie',
                color: 'green',
                name: 'Broccoli'
            },
            {
                type: 'veggie',
                color: 'orange',
                name: 'Carrot'
            }
        ],
        fruit: [{
                type: 'fruit',
                color: 'green',
                name: 'Green Apple'
            },
            {
                type: 'fruit',
                color: 'orange',
                name: 'Orange'
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

console.log(createHarchObject(foodTypes, "types").map(a => a.types))
/* 
[ { 
      name: 'veggie', 
      types: [ 
                { type: 'veggie', color: 'green', name: 'Broccoli' },
                { type: 'veggie', color: 'orange', name: 'Carrot' }
             ] 
  },
  { 
      name: 'fruit', 
      types: [ 
               { type: 'fruit', color: 'green', name: 'Green Apple' },
               { type: 'fruit', color: 'orange', name: 'Orange' } 
             ]  
  } 
]
*/