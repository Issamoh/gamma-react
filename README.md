# Gamma-react
An app for managing and following distibution of tasks between members of a company.</br>
This app consumes Restful APIs developed with Spring Boot that you can find in this repo <a href="https://github.com/Issamoh/gamma">Gamma</a></br>
# Screen Shots
## Login
  The following screen shot shows the result of the case where a user enters false credentials
![login](https://github.com/Issamoh/gamma-react/blob/main/screenShots/10.png)
## Role based application
The interface changes based on the role of the user
+ Case 1 An admin signs in : Nav Bar will include buttons for managing users and tasks
![RBA](https://github.com/Issamoh/gamma-react/blob/main/screenShots/11.png)
+ Case 2 A normal user signs in : Nav Bar will NOT include buttons for managing users and tasks
![RBA](https://github.com/Issamoh/gamma-react/blob/main/screenShots/12.png)
## Adding users
+ Admins can add new users via a form, they must type required fields as they must respect the correct formats of fields (emails, tel numbers ...etc)
![addUser](https://github.com/Issamoh/gamma-react/blob/main/screenShots/13.png)
+ Admin can not add a new user with an existing username
![addUser](https://github.com/Issamoh/gamma-react/blob/main/screenShots/13.5.png)
## Adding tasks
Users can add tasks by introducing A a title, a description and a duration for the new task
![addTask](https://github.com/Issamoh/gamma-react/blob/main/screenShots/15.png)
## Assigning tasks to users
+ An admin can see lists of users by their state (free or occupied)
![affectTask](https://github.com/Issamoh/gamma-react/blob/main/screenShots/16.png)
+ When the admin clicks on the green button, list of new tasks will show up so he can choose a one to be affected to the user
![affectTask](https://github.com/Issamoh/gamma-react/blob/main/screenShots/17.png)
## Following the state of tasks
+ An admin can see lists of tasks by their state (New, in progress, finished, expired or abandoned)
![Tasks](https://github.com/Issamoh/gamma-react/blob/main/screenShots/19.png)
## Finishing a task
+ When a user sings in, he can see the task assigned to him so he can reports that he finished it.
![Tasks](https://github.com/Issamoh/gamma-react/blob/main/screenShots/21.png)
## Security
The Application uses JWT standard to secure communication with backend.

