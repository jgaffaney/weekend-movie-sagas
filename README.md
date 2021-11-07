![License](https://img.shields.io/github/license/jgaffaney/weekend-movie-sagas.svg?style=for-the-badge) ![Repo Size](https://img.shields.io/github/languages/code-size/jgaffaney/weekend-movie-sagas.svg?style=for-the-badge) ![TOP_LANGUAGE](https://img.shields.io/github/languages/top/jgaffaney/weekend-movie-sagas.svg?style=for-the-badge) ![FORKS](https://img.shields.io/github/forks/jgaffaney/weekend-movie-sagas.svg?style=for-the-badge&social) ![Stars](https://img.shields.io/github/stars/jgaffaney/weekend-movie-sagas.svg?style=for-the-badge)
    
# Weekend Movies Saga

## Table of Contents

- [Description](#description)
- [Screenshots](#screenshots)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contacts](#contacts)

## Description

The goal of this project was to create a list of movies that displays their posters.  Users would be able to click on a poster and be brought to a details page that shows a description and movie genres assigned to that movie.  Users would also be able to add their own movie recommendations.

## Screenshots

<img src="" />## Built With

<a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a><a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a><a href="https://nodejs.org/en/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" height="40px" width="40px" /></a><a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a><a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a><a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>

## Getting Started

This project stores its movie recommendations in a  local database.  The database was created with many to many relationships.  The project utilizes Node.js, Express.js, and PostgreSQL on the backend

### Prerequisites

Node.js, Express.js, PostgreSQL and Homebrew 

### Installation

Everything is included in the project.  One would need to first create a DB and fill it in with the queries listed in the database.sql file.  Assuming you have NPM and node, after creating and starting the database, you can run npm install, npm run server, and npm run client

## Usage

The project includes and home page with the list of movies loaded in the DB.  There is an "Add Movie" page, a "Details" page, and an "Edit Details" that one can use to alter any of the information already stored


## Acknowledgements

Thank you to the Solinas cohort members at PrimeDigital Academy for all their help.  Special thanks to Dane, Kris, and Liz at Prime.

## Contacts

<a href="https://www.linkedin.com/in/john-gaffaney-15859179"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>  <a href="mailto:john.gaffaney@icloud.com"><img src=https://raw.githubusercontent.com/johnturner4004/readme-generator/master/src/components/assets/images/email_me_button_icon_151852.svg /></a>
