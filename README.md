# CampusHelp – Student Support Portal

## About the Project
CampusHelp is a responsive student support portal designed to make it easier for students to submit academic, administrative and technical support requests and monitor their progress.

## Features
- Student support request form.
- Student identification using matriculation numbers.
- Form validation to ensure required information is provided.
- Automatic generation of unique request IDs.
- Display of submitted support requests.
- Request status options: Submitted, In Progress and Resolved.
- LocalStorage integration to preserve requests after refreshing the browser.
- Responsive layout for desktop and mobile devices.

## Technologies Used
- HTML5 – Website structure.
- CSS3 – Styling and responsive design.
- JavaScript – Form validation, request management and interactivity.
- Browser LocalStorage – Local data persistence.

## How to Run the Project
1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` using the Live Server extension.
4. Submit a support request and view it under Your Submitted Requests.

## Project Structure
```text
CampusHelp/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Limitations
This project is a frontend demonstration. Submitted requests are stored in the browser's LocalStorage and are not sent to a central server.

Data is browser-specific and is not shared between different users or devices. Request status changes are simulated and are not controlled by an authenticated support administrator.

## Future Improvements
- Backend integration and centralized database storage.
- Student and administrator authentication.
- Real-time request tracking.
- Email notifications.
- Administrative dashboard for managing requests.

## Author
Developed as a student web development project.