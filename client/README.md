# Assignment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4.

## Running the server application

Navigate to the 'server' folder and run the following commands:

$ npm install
$ npm start

This will start the server application.

## Running the client application

Navigate to the 'client' folder and run the following commands:

$ npm install
$ ng serve -o

This will automatically open a new browser instance or browser tab with the client application running.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Implementaion explanation

After doing some research on the most successful to-do list apps available, I've noticed that, in order to
steamline the creation of tasks, you input the title only, and additional description afterwards. I've implemented this by having a single input field (for the title) in the initial task creation form, and the possibility to add the description in the edit modal.

Some features to assist the user such as empty task list message, validation on fields, confirmation on delete, confirmation toasts notifications. Some additional information is also displayed in the edit field such as creation date and last update date. For easy identification the tasks that have description have an additional icon displayed which will, on hover, show the description for a quick view.

When the application is first opened a call is made to get the existing tasks. If no tasks exist the corresponding message is displayed. The page consists of firstly an form for inputting the task. Afterwards the list of tasks is displayed. Each task has a few action available, changing status by clicking the check box, editing by clicking the 'pen' icon, this will open the edit modal, deleting by clicking the 'trash' button.
