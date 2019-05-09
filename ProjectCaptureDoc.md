# Project Capture Document for (Title of Project)
#### *Author: Your_Name_Here*
#### *Stakeholder(s): Their_Names_With_Commas*
#### *Date: Todays Date*


## Background

<!-- 

Explain the context of the problem.
Explain key terms/words, words that may be unfamiliar to a new hire.


Do Example: 
    
    Corey and his team have been manually going through the html for all images in canvas and filling in the alt attribute. This has been very time consuming. 
    - Alt image text, also called "image alt text", or just "alt text", is the text that appears on html pages if the image fails to load.

Don't Example:

    Aaron TODO

-->

-----

## Definition of Done
<!-- 

What is/are the project outcome(s)?
("Can you give me one sentence describing what you want done?")
We are trying to clean up the yard by Mow, Edge, and Rake.

Do Example:

    We are creating a tool to find all images that are in need of alt text in canvas which will automate this process by showing an image and prompting for alt text.

Don't Example:

    Aaron TODO

-->
We need to take a csv of city data and organize it into a json file with data sorted by country, state, and city in that order. 

-----

# Requirements

### General Requirements

### Input Requirements

#### Definition of Inputs

<!-- List here a type definition for each input. For example, if it is a CSV define the column names. If it is a JSON, give an example of the JSON structure. If it is user input, what will the user be asked for? -->
It takes a csv with the following headers:

|Country Name | State Name | Name | Population|

#### Source of Inputs

<!-- Paragraph of how to get inputs. From who? From where: Slack, email, server...? This also includes user selected options at runtime. How will we know what options to select? For example, in conversion tool, you'd follow the values on the Trello Board. It would also include the steps to get access to the information you need, such as getting added to a Trello Board, or access to a server. -->

Josh will give us the highly confidential data on an indescreet flashdrive every Thursday at midnight in the middle of the woods. Just keep an eye out for the cloaked man with the two large hounds. Once you have the flashdrive connected to the computer, you run the tool in the commandline with the following arguments.
- _csv file path_: The path to the csv file we need to process (In this case it is Josh's sketchy mystery drive
   
   >  ~/cityData.csv
- _output file path_: The path and name of the JSON file you would like to write.
   
    > ~/newCityData.JSON

---

### Output Requirements

#### Definition of Outputs

<!-- List here a type definition for each output? For example, if the changes are directly to the LMS, list all changes that occur. If it is a CSV define the column names. If it is a JSON, give an example of the JSON structure. -->
It creates a formatted JSON file in the following format:
```javascript
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

#### Destination of Outputs

<!-- Paragraph where/who to send outputs. To who? To where: Email, server, directly to LMS...? It would also include the steps to get access to the locations you need, such as getting added to a Trello Board, or access to a server, or the LMS. -->
It will print the file in the path specified in the input.

---

### User Interface

#### Type: Commandline
The user will run this tool in the terminal with the arguments provided in the terminal
```terminal
node bin [csv file path] [JSON file destination]
```

<!-- CLI with Flags, CLI With Prompt, Web Page, Server, Library, etc -->

<!-- What are the flags, what are Major Questions, Images of UX/UI Design. -->

-----

## Expectations

### Timeline
2-3 Days
- Day 1 - Project Design
- Day 2 - Create Tool
- Day 3 - Tie Loose Ends and Finish Documentation

<!-- Include Milestone List here with Deadlines and try to make each milestone a minimum viable product
- Milestone 1: Finish Design (3/19)
- Milestone 2: Build Core logic to search for words in syllabi (3/22)
- Milestone 3: Connect inputs to core logic and set up outputs (3/25)
- Milestone 4: Deliver the project (3/26)
This will probably be overkill for small projects -->

### Best Mode of Contact
Carrier Pigeon:

Roost 666

### Next Meeting
Thursday, May 16th in the woods at midnight.


### Action Items
<!-- Recap Meeting -->
Get this done asap so he can start his world conquest bit.

We cannot start the project without the csv so get that from him ASAP!

#### TechOps
#### Stakeholder

-----

#### *Approved By:* 
#### *Approval Date:*
