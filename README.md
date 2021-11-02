## BUILDING THE POWERBALL LOTTERY - REST API FOR THE BACK-END CHALLENGE FROM CODILITY. 

[![license](https://img.shields.io/github/license/DAVFoundation/captain-n3m0.svg?style=flat-square)](https://github.com/matheusicaro/coderbyte-full-stack-project/blob/master/LICENSE)


## Summary:

1. [Intro](#intro)
2. [Challenge](#challenge)
3. [Business Rules and Possible Results](#business-rules-and-possible-results) 
4. [Project Screen Shot](#project-screen-shot)
5. [Installation and Setup Instructions](#installation-and-setup-instructions))
6. [Folder Structure](#folder-structure)
7. [Project Specifications](#project-specifications)
8. [To Do List](#to-do-list)


## Intro:

API Rest developed for Codility's Full Stack developer challenge. <br>

The goal is to develop an api capable of generating tickets, awarded or not, for the traditional USA lottery, [Powerball](https://www.powerball.com/games/home).

## challenge

Powerball is a popular US lottery game with draws twice a week. For the purposes of this exercise, a Powerball lottery "ticket" includes the date of the draw and one or more "picks". Each "pick" is a set of 5 integers (from `1`-`69`) along with a 6th integer (the _Powerball_, from `1`-`26`).

For example, a pick for the draw on `2017-11-09` might be:

`02 14 19 21 61` `25`

Your application's API will accept data for a lottery ticket, and respond with whether each pick has won, the prize won per-pick, and the total of all prizes won on the ticket. It is up to you to design and build this API.

The Powerball winning numbers change on each "draw date". In order to determine a win or a loss, your application will have to retrieve the Powerball draw dates and winning numbers from the following public URL:

[https://data.ny.gov/resource/d6yy-54nr.json](https://data.ny.gov/resource/d6yy-54nr.json)

To calculate the prize, consult the prize matrix image below:

![Powerball Rules](https://github.com/matheusicaro/codility-exercise-powerball-service/blob/master/data/powerball_rules.png)

### Exercise Rules

- There is no time limit to this challenge.
- Use your best discretion with the design and requirements, but you can ask questions.
- You must use JavaScript and must extend this code base.
- There is no need for a UI to solve this problem.
- Follow modern JavaScript and Node best practices and conventions to the best of your ability.
- You are free to add packages, tools or improvements to your project as you see fit.
- We expect you to write the kind of feature you would put into production, including tests and documentation as you see fit.

---

## Business Rules and Possible Results

### [POST] /powerball/check/result


**Summary**: Returns award ticket for each pick list entered
<br/>
**Description**: Accept data for a lottery ticket, and respond with whether each pick has won, the prize won per-pick, and the total of all prizes won on the ticket
       


#### BUSINESS RULES

1. The draw calculations correspond to the rules established by the challenge proposal which is more detailed [here](https://github.com/matheusicaro/codility-exercise-powerball-service/edit/master/README.md#challenge). <br/>
2. Prize values and settlement rules are defined in this project file: [/app/constants/powerball-prize-ruls.contastants.js](https://github.com/matheusicaro/codility-exercise-powerball-service/blob/master/app/constants/powerball-prize-ruls.contastants.js) <br>
3. The results (winning numbers) are obtained from an external service provided through this link: [https://data.ny.gov/resource/d6yy-54nr.json](https://data.ny.gov/resource/d6yy-54nr.json) <br/>
4. Prize values are multiplied by the multiplication factor informed by the external api for each selected draw and according to the rules established for the [challenge](https://github.com/matheusicaro/codility-exercise-powerball-service/edit/master/README.md#challenge).

:triangular_flag_on_post: **OBS: There was a doubt generated for the scenario when any pick is awarded the GRAND PRIZE.** :triangular_flag_on_post:

As the maximum value was not established in the challenge rules table, the following rule was considered:
1. For a list with a single pick that is awarded as GRAND PRIZE, **will be returned GRAND PRIZE STANDARD VALUE**
2. For a list of more than one pick with at least 1 being awarded as a GRAND PRIZE,  **will be returned GRAND PRIZE STANDARD VALUE**
3. **The values of each ticket awarded will not be calculated in total value when there is at least one value awarded as GRAND PRIZE**.

###### GRAND PRIZE STANDARD VALUE:
```
{
  "total_won": {
    "value": 0,
    "value_formatted": "Grand Prize"
  }
}
```

<br/>

#### POSSIBLE RESULTS
        
INPUT: 
```
{
  "draw_date": "2021-10-30",                 // Date of desired draw for picks analysis
  "picks": [
    "05 25 28 43 56 19",
    "01 23 30 40 56 19",
    "05 12 35 44 51 06"
  ]
}
```

OUTPUT: 
```
{
  "draw_date": "2021-10-30",                 // Date of desired draw entered as input
  "winning_numbers": "05 23 28 43 56 19",    // Draw numbers for the date entered in "draw_date"
  "total_won": {
    "value": 100014,                         // Total value won as true added to the list of games in "tickets" in double format
    "value_formatted": "$100,014"            // Total value won as true added to the list of games in "tickets" in format US Dollar currency
  },
  "tickets": [
    {
      "pick": "05 25 28 43 56 19",           // FIRST pick informed for ticket generation
      "result": {
        "won": true,
        "value": 100000,                     // Ticket value for pick played
        "value_formatted": "$100,000"        // Ticket value for pick played
      }
    },
    {
      "pick": "01 23 30 40 56 19",           // SECOND pick informed for ticket generation
      "result": {
        "won": true,
        "value": 14,
        "value_formatted": "$14"
      }
    },
    {                                        // Ticket not awarded
      "pick": "05 12 35 44 51 06",           // THIRD pick informed for ticket generation
      "result": {
        "won": false,
        "value": 0,
        "value_formatted": "$0"
      }
    }
  ]
}
```

## Project Screen Shot

### :white_check_mark: [ [Access the application online here](https://codility-exercise-powerball-se.herokuapp.com/) ] 


![back-end](https://github.com/matheusicaro/codility-exercise-powerball-service/blob/master/data/api-docs.gif)


## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

1. clone the repository: `git clone https://github.com/matheusicaro/codility-exercise-powerball-service.git`
2. At the root of the project, install through: `npm install`
4. Decide which enviroment will be used: <br><br>
    **OPTION_1)** *in the project environment settings, it is already filled with a default environment atraves do arquivo `.env`.*<br><br>
    **OPTION_2)** Insert the deseda environment variables to run the project, following as an example the `.env-cloud` file
    
5. To Start Server: `npm start`  
6. To Check Health Api: `http://localhost:3000/api/v1/health`
7. To Documentation Api: `http://localhost:3000/api-docs`  


## Folder Structure

```
-- app/ _________________________________: API business layer
-- app/config ___________________________: layer for configurations of essential services such as logger, environment, etc.
-- app/routes ___________________________: API routes
-- app/constants ________________________: layer for general constants such as messages, warnings, etc.r
-- app/controllers ______________________: layer for controllers for handling requests
-- app/exceptions _______________________: layer for custom exceptions for API
-- app/integration ______________________: layer for integration of external services such as PAI and others
-- app/models ___________________________: layer for structured objects for runtime use
-- app/services _________________________: layer for business rules that responds to requests.
-- test/ ________________________________: application unit tests
```  

## Project Specifications

- Used [Node.js](https://nodejs.org/en/) with [express](https://expressjs.com/)
- Used [Jest](https://jestjs.io/) for unit testing
- Used [Winston](https://typicode.github.io/husky/#/) for the storage of the logs.
- Used [Axios](https://axios-http.com/) for promises based HTTP client

## To Do List:  

Due to the availability of time to implement the solution for the proposed challenge, some tasks that are not mandatory for the challenge, but essential to deliver a solution, are pending below:

1. *Cache*: it is recommended to use cache for searches in the external lottery results api. Once the first search is performed, the results could be cached in a database such as *Redis* or even in the *application's memory*. Thus, for queries that are in the cache, it will result in the application's response time gain. For cases where the date is more recent than what is in the cache, you should look for the result in the external api.

2. Increase unit test and integration coverage

![back-end-test-coverage](https://github.com/matheusicaro/codility-exercise-powerball-service/blob/master/data/back-end-test-coverage.PNG)