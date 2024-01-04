let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
  });
}
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

function getCurrentDate() {
  const now = new Date();
  const options = { day: "numeric", month: "short" };
  return now.toLocaleDateString("en-US", options);
}

document.getElementById("currentDate").innerText = getCurrentDate();

console.log("admin_to_recruiter-details.js is loaded");

//yha se
document.addEventListener("DOMContentLoaded", () => {
  // Get the recruiter name from the URL parameters
  const params = new URLSearchParams(window.location.search);
  const recruiterName = params.get("name");

  // Set the recruiter name in the heading
  const adminNameElement = document.getElementById("admin-name");
  console.log(adminNameElement);

  // Check if the element is found before setting textContent
  if (adminNameElement) {
    adminNameElement.textContent = recruiterName;
  } else {
    console.error("Element with ID 'admin-name' not found.");
  }

  // Fetch and display candidate details for the recruiter (you need to implement this)
  fetchCandidateDetails(recruiterName);
});

// admin_to_recruiter-details.js

async function fetchCandidateDetails(recruiterName) {
  try {
    console.log("fetch shuru");
    const response = await fetch(
      `http://localhost:3000/recruiter_details?name=${recruiterName}`
    );
    console.log("response hogya");

    if (!response.ok) {
      console.log("error aaya");
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const candidates = await response.json();
    console.log(candidates);
    const tableBody = document.querySelector("table tbody");

    // Clear existing rows in the table
    tableBody.innerHTML = "";

    const candidatesArray = Object.values(candidates.recruitedCandidates);

    candidatesArray.forEach((candidate) => {
      const row = document.createElement("tr");
      row.innerHTML = `
    <td>${candidate.name}</td>
    <td>${candidate.phone}</td>
    <td>${candidate.location}</td>
    <td>${candidate.jobInterest}</td>
    <td>${candidate.Status}</td>
    <td>${candidate.joinedAt}</td>
    <td>${candidate.isActive}</td>
  `;
      console.log("table me jaara hai");
      tableBody.appendChild(row);
      console.log("table me chala gya");
    });
  } catch (error) {
    console.error(error);
  }
}
