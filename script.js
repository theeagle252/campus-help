
// ===================================
// CAMPUSHELP - STUDENT SUPPORT PORTAL


// 1. SELECT HTML ELEMENTS

const requestForm = document.getElementById("requestForm");
const requestsList = document.getElementById("requestsList");


// 2. LOAD SAVED REQUESTS FROM LOCAL STORAGE

let requests = [];

try {
    const savedRequests = localStorage.getItem("campusHelpRequests");

    requests = savedRequests ? JSON.parse(savedRequests) : [];

    if (!Array.isArray(requests)) {
        requests = [];
    }

} catch (error) {
    console.error("Could not load saved requests:", error);
    requests = [];
}


// 3. SAVE REQUESTS TO LOCAL STORAGE

function saveRequests() {

    try {
        localStorage.setItem(
            "campusHelpRequests",
            JSON.stringify(requests)
        );

        return true;

    } catch (error) {
        console.error("Could not save requests:", error);

        alert("Your request could not be saved in this browser.");

        return false;
    }
}


// 4. GENERATE A REQUEST ID

function generateRequestID() {

    return "CH-" + Date.now().toString(36).toUpperCase();

}


// 5. HANDLE FORM SUBMISSION

requestForm.addEventListener("submit", function(event) {

    // Stop the browser from refreshing the page
    event.preventDefault();


    // Get the values entered by the student
    const studentName = document
        .getElementById("studentName").value.trim();

    const matricNumber = document
    .getElementById("matricNumber").value.trim();

    const studentEmail = document
        .getElementById("studentEmail").value.trim();

    const category = document
        .getElementById("category").value;

    const subject = document
        .getElementById("subject").value.trim();

    const description = document
        .getElementById("description").value.trim();


    // Additional validation
    if (
        studentName.length < 3 ||
        matricNumber.length < 3 ||
        studentEmail === "" ||
        category === "" ||
        subject.length < 5 ||
        description.length < 10
    ) {

        alert("Please complete all fields correctly.");

        return;
    }


    // Create a new request object
    const newRequest = {

        id: generateRequestID(),

        name: studentName,

        matricNumber: matricNumber,

        email: studentEmail,

        category: category,

        subject: subject,

        description: description,

        status: "Submitted",

        date: new Date().toLocaleString()

    };


    // Add the request to our requests array
    requests.unshift(newRequest);


    // Save the request
    if (!saveRequests()) {

        requests.shift();

        return;
    }


    // Update the request display
    displayRequests();


    // Clear the form
    requestForm.reset();


    // Notify the student
    alert(
        "Your request has been submitted successfully!\n" +
        "Request ID: " + newRequest.id
    );


    // Move to the submitted requests section
    document.getElementById("my-requests").scrollIntoView({
        behavior: "smooth"
    });

});


// 6. DISPLAY ALL SUBMITTED REQUESTS

function displayRequests() {

    // Clear the previous display
    requestsList.replaceChildren();


    // Show a message if there are no requests
    if (requests.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.className = "empty-message";

        emptyMessage.textContent =
            "You haven't submitted any requests yet.";

        requestsList.appendChild(emptyMessage);

        return;
    }


    // Create a card for each request
    requests.forEach(function(request) {

        const card = document.createElement("div");

        card.className = "request-card";


        // Request ID
        const heading = document.createElement("h3");

        heading.textContent = request.id;


        // Request details
        const name = document.createElement("p");

        name.textContent = "Student: " + request.name;

        const matric = document.createElement("p");

        matric.textContent = "Matric Number: " + request.matricNumber;


        const email = document.createElement("p");

        email.textContent = "Email: " + request.email;


        const category = document.createElement("p");

        category.textContent = "Category: " + request.category;


        const subject = document.createElement("p");

        subject.textContent = "Subject: " + request.subject;


        const description = document.createElement("p");

        description.textContent =
            "Description: " + request.description;


        const date = document.createElement("p");

        date.textContent = "Date: " + request.date;


        // Status label
        const status = document.createElement("span");

        status.className = "status-label";

        updateStatusAppearance(status, request.status);

        status.textContent = request.status;


        // Status selection
        const statusSelect = document.createElement("select");

        const statusOptions = [
            "Submitted",
            "In Progress",
            "Resolved"
        ];


        statusOptions.forEach(function(optionValue) {

            const option = document.createElement("option");

            option.value = optionValue;

            option.textContent = optionValue;

            statusSelect.appendChild(option);


        });


        statusSelect.value = request.status;


        // Update status when selected
        statusSelect.addEventListener("change", function() {

            const previousStatus = request.status;

            request.status = statusSelect.value;

            if (saveRequests()) {

                updateStatusAppearance(status, request.status);

                status.textContent = request.status;

            } else {

                request.status = previousStatus;

                statusSelect.value = previousStatus;

            }

        });


        const statusText = document.createElement("p");

        statusText.textContent = "Update request status:";


        // Add everything to the card
        card.appendChild(heading);

        card.appendChild(name);

        card.appendChild(matric);

        card.appendChild(email);

        card.appendChild(category);

        card.appendChild(subject);

        card.appendChild(description);

        card.appendChild(date);

        card.appendChild(status);

        card.appendChild(statusText);

        card.appendChild(statusSelect);


        // Add the card to the page
        requestsList.appendChild(card);

    });

}


// 7. CHANGE STATUS APPEARANCE

function updateStatusAppearance(element, status) {

    element.classList.remove(
        "status-submitted",
        "status-in-progress",
        "status-resolved"
    );


    if (status === "Submitted") {

        element.classList.add("status-submitted");

    } else if (status === "In Progress") {

        element.classList.add("status-in-progress");

    } else if (status === "Resolved") {

        element.classList.add("status-resolved");

    }

}


// 8. DISPLAY PREVIOUSLY SAVED REQUESTS

displayRequests();

