## BUILDING THE POWERBALL LOTTERY - REST API FOR THE BACK-END CHALLENGE FROM CODILITY. 

## Summary:

1. [Intro](#intro)
2. [Challenge](#challenge)
3. [Project Screen Shot](#project-screen-shot)
4. [Installation and Setup Instructions](#installation-and-setup-instructions))
5. [Folder Structure](#folder-structure)
6. [Project Specifications](#project-specifications)
7. [To Do List](#to-do-list)


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

## Project Screen Shot

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