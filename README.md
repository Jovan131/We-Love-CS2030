# NUS Orbital: We-Love-CS2030
Repository for Orbital Project - rc4nnect


# Motivation
In RC4, there are many (40+) Interest Groups (IG) that residents can choose to attend. Currently, each IG communicates the timings and venues to members through their own Telegram groups, where interested residents can poll for their attendence. With this large number of IGs, it becomes a hassle to check through every group one-by-one to poll for one's attendance, and these polls and other announcements can get lost among other Telegram chats. The sheer volume of notifications also clogs up one's Telegram application, which is counterproductive as many people choose to mute their notifications as a result. 

Additionally, the large number of IGs means there are Interest Groups that may struggle to gain exposure to new members as their only means of communication and exposure currently is through these Telegram groups, and not every residents may choose to join so many groups.


# User stories & Use cases
We plan to create a web application where RC4 residents can sign up for IGs sessions, manage their weekly IGs schedule, and view information about other IGs they are interested in. With rc4nnect, we hope to eliminate the need to have multiple Telegram groups for every IG, and make the process of following and signing up for IGs less complicated for everyone.

1. As a resident of RC4, I want to be able to manage and view everything IGs-related in one place.
2. As a frequent member of an Interest Group, I want to be able to quickly check the venue and timing for my IG’s sessions that week.
3. As someone looking to try out new Interest Groups, I want to be able to quickly look at the list of IGs and the timings of their sessions to know which IG session I want to and can attend.
4. As someone who goes to sessions of many different IGs, I want to be able to quickly view my personal IG schedule for the week. 
5. (Pipeline) As a member of the IG Exco, I want to publicize my Interest Group to more people and welcome more new members to the IG. I also want to reduce miscommunication during dissemination of information (eg. people not informed of a change in session timing/venue).


# Tech Stack
## Frontend
* React
* Tailwind CSS

## Meta Framework
* Next.js

## Backend
* Django
* Django Rest Framework (to create API consumed by React frontend)

## Database 
* SQLite (temporary, eventual migration to PostgreSQL)
* PostgreSQL 

## Tools
* Typescript
* Firebase (Authentication)
* Vercel
* PythonAnywhere (to host Django backend API, may migrate to Render later)


# Features
## Authentication
### Description
Currently, we are using Firebase Authentication to do user registration. The user's information and their IG preferences are linked to their account. 

### Considerations
Going forward, we will be moving our user database to our own database hosted on our backend (PostgreSQL), and authentication will be done using JSON Web Tokens (JWT). JWTs will have two key benefits. Firstly, they can be signed, allowing us to be certain that the senders are really who they say they are. Additionally, the structure of a JWT allows you to verify that the content hasn't been tampered with.
Importantly, there will also be 2 different classes of users: Resident and IG Head. For now, the essential difference is that IG Heads have the ability to create new slots and manage them, as well as make announcements to update residents on any updates to their IG.

## Weekly IG Schedule
### Description
On the home page, users can see a weekly view of all the IG slots that they have polled for (or are on the waiting list)

### Considerations
Currently, users are able to see the number of slots currently available as well as the maximum capacity. Colour codes are also used to clearly show the current polling status:
-Green: Slots are available
-Blue: User has polled successfully
-Orange: User has polled successfully, but is currently on the waiting list

Going forward, we hope to allow users to view other essential information in a pop-up window upon clicking on each individual slot, such as venue, exactly who has currently polled for the slot, etc.

# Pipeline features
## Alerts 
Web pop-up alerts in response to user actions such as succesful login/registration, "successfully polled for session", "no more available slots", etc. will be implemented for a better user experience

## IG Catalouge
This will be a schedule of every IG in RC4. There will be options to filter based on category of IG (eg. sports/lifestyle/arts), venue of session, as well as other criteria.

## Notification 
Allows IG Heads to make announcements. There will be 2 panels for notifications: one for IGs which users have subscribed to, and one for All IGs, so that announcements can better reach their target audience. We also plan to enable push notifications which will be more effective especially in the mobile setting.

## My IG
A personalized page where users can view their own schedule through a weekly view, as well as manage which IGs they are subscribed to. Most importantly, they can also poll for slots for IGs they are subscribed to.

## Dark mode/Color schemes
We plan to implement a dark mode option which will be accessible via a Settings panel. Users will also be able to adjust options for the colour codes for the slots, to allow for further personalization.

# Wireframe
Usage flow (created using Excalidraw)

![image](https://github.com/Jovan131/We-Love-CS2030/assets/122341707/b73af328-9627-451d-bc49-ae3a8b1acdcd)

# Database Design
Blue: By Milestone 1 (except polling functionality)
Everything else: By Milestone 2, possibly also including an "Admin" role

![ER diagram for database v1 drawio](https://github.com/Jovan131/We-Love-CS2030/assets/122272142/e0023c09-cef7-404e-abc5-76902e24901f)
