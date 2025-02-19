
## Project Description 
* Developed an API automation framework from scratch to test for JSONPlaceholder public APIs.
* Utilized TypeScript and Playwright’s request context for efficient and reliable API testing.
* Applied an Object-Oriented Programming (OOP) structure to ensure reusability, scalability, and maintainability of the framework.
* Integrated CI/CD pipelines with GitHub Actions for automated testing and deployment.
## Pre requisites
* Nodejs installed version 20 and above (you can use NVM)
* IDE (VScode, Webstorm)
## Getting started
* to get started with the project - first clone the repo by opening the terminal in your IDE and run:
    * `git clone https://github.com/NinaNaryzhna/JSONPlaceholderTestTask.git`
## Installing dependencies and Playwright
* after cloning the repo - navigate to the root directory:
    * `cd JSONPlaceholderTetsTask`
* install dependencies by running the following commands in this order:
    * `npm ci`
    * `npx playwright install`
## Running tests
* To run all of the tests you can run the following command in the terminal:
    * `npm run test`
* To run a specific test you can do it in two ways:
    * run a specific test file e.g `npm run test tests/posts-api-tests.spec.ts`
    * or navigate to a specific test file and type `.only` on a specific `test` block example:
        `test.only('test goes here') => {`
## Running tests in parallel
* To run a tests in parallel with multiple workers you can specify the number of workers:
    * `npx playwright test --workers=4'` 
    * or override the current sciprt 1 worker: `npm run test -- --workers 4`
## Reports
* The reports that are used in this project are playwright html reports.
* To generate a report after a test, run the following:
    * `npx playwright show-report`
* The reports are also saved as artifact and saved for a limited time on github - which you can download as a zip file and extract them to view.

## CI/CD
* In this project I'm using GitHub Actions CI/CD - any code changes you'll push will trigger the github actions pipeline where tests will checkout the current branch, install dependencies and runs all of the tests, deploy and upload the playwright html report.
* Test results html report will be uploaded as an artifact as well after each run so you can download it if you prefer that way (the report is retained up to 30 days after test run)
