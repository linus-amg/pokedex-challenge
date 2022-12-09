# pokedex-challenge

## How to run this locally

### Clone the repository and enter the directory, then checkout the feature branch
```sh
$ git clone https://github.com/linus-amg/pokedex-challenge.git
$ cd pokedex-challenge/
$ git checkout 01-initial-solution
```
#### 1. Build the docker image for the database
```sh
$ make env-build
```
#### 2. Run the docker container for the database
```sh
$ make env-up
```
#### 3. Install and run the API Server
```sh
$ cd api/
$ npm install
$ npm run dev
```

#### 4. Create another terminal tab/window and navigate to the root of the repository, afterwards Install and run the UI Server
```sh
$ cd ui/
$ npm install
$ npm start
```

#### 5. You are done with the setup and can start using the application.
Visit http://localhost:8081 in your browser to open up the application if it did not open up automatically for you.

You can find more information about the Database, API and UI decisions in their respective .md files in the /thoughts_and_decisions/ folder.