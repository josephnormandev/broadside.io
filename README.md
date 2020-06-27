# Broadside.IO Github Repository
...is a MOBA/RTS style game. Read the game concept document: [Google Doc](https://docs.google.com/document/d/10edULc2pd3qQPO-sU_3UaSbxxEqsm-BoCUHMFhUqDoc/edit?usp=sharing)

# Code Documentation
Because this is a web-based .IO game, the frontend code has to be written in HTML/CSS/JS. We chose node.js for our project so that we could have uniformity between the frontend and backend code. So this is your typical MERN stack project:

  - MongoDB
  - Express JS
  - React JS
  - Node JS

## Installation
Because everything is based around node.js, installation of the project is rather simple.

### 1. Installing Node.js
First, we'll go ahead and install node.js version 13.14.0 from this website: [nodejs.org](https://nodejs.org/en/download/releases/). Download the version for your operating system. Once installed, you should have nodejs v13.14.0 and npm v6.14.4.

### 2. Cloning the Git Repository
Second, clone the repository from git using the following command in Git Bash.

    git clone https://github.com/josephnormandev/broadside.io.git

### 3. Installing all of the Dependencies
Because we're using NPM (node package manager), keeping track of dependencies is extremely simple. In your command prompt, navigate to the directory you just cloned (should be called broadside.io). Then descend into the following folders and execute the commands:

**broadside.io/frontend**

    npm i
-------------------------
**broadside.io/server**

    npm i
-------------------------
It's that easy!

### 4. Downloading the config.json file
The config.json file contains passwords to the database, default port numbers, and paths for certain files. There is a version for our own personal development use and another version for the production server. Here's the link for the [config.json](https://drive.google.com/file/d/1lHq9uOMX-lTdnW3QoM-5YE0_eAm1ntHg/view?usp=sharing)

---
Then, paste that file into:
**broadside.io/server/config.json**

### 5. Executing the Program
Because we're using NPM, running a simple command can launch the server locally.

---
In a terminal window, navigate to **broadside.io/server** and execute this command:

	npm start
Then in a second terminal window, navigate to **broadside.io/frontend** and execute this command:

    npm start

Do not close these windows because they are both actively hosting the development server, which has two parts:

1. The **backend**, started by the first command
2. The **frontend**, started by the second command

That's all there is to it. If you want to see what's being hosted, go to your web browser and navigate to the following [URL](http://127.0.0.1:3000)


---
... WIP, more incoming
