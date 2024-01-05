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


const monthNames = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"
];


document.addEventListener("DOMContentLoaded", () => {
  // Get the recruiter name from the URL parameters
  const params = new URLSearchParams(window.location.search);
  const recruiterName = params.get("name");

  const adminNameElement = document.getElementById("admin-name");

  // Check if the element is found before setting textContent
  if (adminNameElement) {
    adminNameElement.textContent = recruiterName;
  } else {
    console.error("Element with ID 'admin-name' not found.");
  }

  // Declare selectedMonth outside the event listener
  let selectedMonth;

  // Fetch and display candidate details for the recruiter (you need to implement this)
  fetchCandidateDetails(recruiterName);

  // Add event listener for the change event on the month selector
  const monthSelector = document.getElementById("month");

  if (monthSelector) {
    monthSelector.addEventListener("change", () => {
      // Convert selectedMonth to lowercase
      const selectedMonth = monthSelector.value.toLowerCase();

      // Find the index of the selected month in the array
      const selectedMonthNumber = monthNames.indexOf(selectedMonth) + 1;

      if (recruiterName) {
        fetchCandidateDetails(recruiterName, selectedMonthNumber);
      } else {
        console.error("Recruiter name is undefined");
      }
    });
  } else {
    console.error("Month selector is not found in the DOM");
  }
});

// admin_to_recruiter-details.js

// admin_to_recruiter-details.js

async function fetchCandidateDetails(recruiterName, selectedMonth) {
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

    const recruiterData = await response.json();
    const candidates = recruiterData.recruitedCandidates;
    console.log(candidates);

    const tableBody = document.querySelector("table tbody");

    // Clear existing rows in the table
    tableBody.innerHTML = "";

    const candidatesArray = Object.values(candidates);
    console.log(candidatesArray);

    candidatesArray.forEach((candidate) => {
      // Check if joinedAt is a valid date
      const joinedAtDate = new Date(candidate.joinedAt);
      console.log(joinedAtDate);

      if (!isNaN(joinedAtDate)) {
        console.log("aarha");

        // Ensure selectedMonth is a valid number
        console.log(selectedMonth);
        if (selectedMonth === undefined || (selectedMonth && joinedAtDate.getMonth() + 1 === selectedMonth)) {
          console.log("jldi");
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${candidate.name}</td>
            <td>${candidate.phone}</td>
            <td>${candidate.location}</td>
            <td>${candidate.jobInterest}</td>
            <td>${candidate.Status}</td>
            <td>${joinedAtDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}</td>
            <td>${candidate.isActive}</td>
          `;
          console.log("table me jaara hai");
          tableBody.appendChild(row);
          console.log("table me chala gya");
        }
      } else {
        console.error(`Invalid joinedAt date for candidate: ${candidate.name}`);
      }
    });

    // ... (remaining code)

  } catch (error) {
    console.error(error);
  }
}
