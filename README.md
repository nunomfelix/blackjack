## Blackjack Game
This project is a simple implementation of the card game Blackjack.It includes a simple UI for playing the game built with Vue.js and a backend service developed using Typescript and the Nest.js framework. 

### Rules of Blackjack
Blackjack is a card game where players aim to have a hand with a total value as close to 21 as possible without exceeding it. The goal is to beat the dealer's hand.

- The value of numbered cards 2 to 10 is equal to their face value.
- Face cards (Jack, Queen, King) have a value of 10.
- An Ace can have a value of 1 or 11, depending on the player's preference and the current hand's total value.

## Features
- Interactive UI for playing Blackjack
- Backend service for handling game logic and scoring
- Simple and clean codebase
- Object-oriented design
- Test coverage for critical functionalities

## Project Structure
The project follows a modular structure with separate frontend and backend components.

- frontend/ - Contains the frontend application for the UI.
- backend/ - Contains the backend service developed using Nest.js.
  - src/ - Contains the source code for the backend service.
    - controllers/ - Handles HTTP requests and interacts with the game logic.
    - services/ - Implements the game logic and scoring.
    - models/ - Defines the models used in the game.
    - app.module.ts - Configures the Nest.js application module.

## Installation

To install the dependencies, run:

```bash
  cd backend/
  yarn install
  cd ../frontend
  yarn install
```

## Configuration

Create .env file for ENVIRONMENT variables

```bash
mv .env.example .env
```
Update .env file with config variables

## Docker
if you are familiar with docker and docker-compose then you can run built in docker-compose file, which will install and configure application and database for you.

### Docker installation
Download docker from Official website

- Mac https://docs.docker.com/docker-for-mac/install/
- Windows https://docs.docker.com/docker-for-windows/install/
- Ubuntu https://docs.docker.com/install/linux/docker-ce/ubuntu/

### Docker-compose installation
Download docker from Official website

### Run the project
Open terminal and navigate to project directory and run the following command.

```bash
PORT=3000 docker-compose up --build
```
Note: The backend application will run on port 3000 (http://localhost:3000), the frontend application will run on port 8080 (http//localhost:8080)

## Tests
To run the tests, run:
```bash
cd backend/
yarn test
```

## Development Mode
Launch the backend in development mode:
```bash
yarn start:dev
```
Launch the frontend in development mode:
```bash
yarn dev
```

## Author
- Author - [Nuno Félix](https://github.com/nunomfelix)
