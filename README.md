# Node API Server - Vue Beginner Guide

nodeapiserver-vuebeginnerguide is a API server based on Node.js and Express.js that allows followers of the Vue Beginner Guide to use this Node based server instead of the .NET Core server.

This is a out of the box solution, all the routes are already set up and you just need one command to run the whole server. The data gets persisted (saved) in an SQLite database, which is filebased, so this is covered as well out of the box. 

**Links:**
* Vue Beginner Guide on YouTube: https://www.youtube.com/playlist?list=PLOeFnOV9YBa6en9lpCqbFgrSR4fN67ka3
* Vue Beginner Guide on GitHub: https://github.com/T0shik/raw-coding-vue-guide

Prerequisites
===
* [Node.js](https://nodejs.org/en/) Environment
* [npm](https://www.npmjs.com/get-npm) installed (should come with Node.js)
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed - obviously, since we are on GitHub :wink:
* A Terminal

Installation & Usage
===
This is actually very straightforward if the you meet the above mentioned requirements.

First you [clone](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) this repository in folder of your choice.

The you navigate to the cloned folder with your terminal (you need to be inside `nodeapiserver-vuebeginnerguide/`) and you install all the dependencies with:

```
npm install
```

Now you can test if everything is working with:
```
npm test
```
This should start the server and run the tests for all the API endpoints and make sure they are accessible and work. You should see a success message (like `6 passing (101ms)`).

Great, everything works fine! Now you can start the server with
```
npm run start
```

This starts the server in the terminal (it stops when you close it) and should give the following output:
```
Server running on port 3000
Connected to SQLite database
```

Perfect! Now the server is running `http://localhost:3000` and you can start making requests (`http://localhost:3000/profile` for a list of the profiles for example - if you have any). 

The server is running with [Nodemon](https://www.npmjs.com/package/nodemon) which means it will detect if there are file changes and restart the server (very handy for development but should be turned off for production use).

API Endpoints
===
Please note that the endpoint is always `/profile` with a lowercase `p`, as opposed to `/Profile` in the YouTube tutorial.

Also note that the properties `firstname` and  `lastname` are lowercase (because of the database) and not camelCase (`lastName`).

Here are the endpoints you can access:


|Description | HTTP Method | Endpoint | Parameter / Body  | Response |
| ------------- |:-------------:| -----:| -----:| -----:|
| Server Test | GET      | / |  | { message: "Ok" } |
| Profile List | GET      | /profile | | { [profiles] } |
| Single Profile (by firstname) | GET      | /profile/:name | profile.name | { profile } |
| Create Profile | POST      | /profile | Body: { firstname: "", lastname: "",  gender: "", bio: "", age: ""} | { profile } |
| Update Profile (by id) | PATCH      | Parameter: /profile/:id, Body: { firstname: "", lastname: "",  gender: "", bio: "", age: ""} | profile.id | { message: "updated" } |
| Delete Profile (by id) | DELETE      | /profile/:id | profile.id | { message: "deleted" } |

Bugs & Contributions
===

Just open an issue or make a fork if you encouter any bugs or want to help! This is always welcome :smiley: