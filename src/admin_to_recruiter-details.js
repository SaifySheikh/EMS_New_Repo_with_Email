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
  const params = new URLSearchParams(window.location.search);
  const recruiterName = params.get("name");

  const adminNameElement = document.getElementById("admin-name");

  if (adminNameElement) {
    adminNameElement.textContent = recruiterName;
  } else {
    console.error("Element with ID 'admin-name' not found.");
  }

  let selectedMonth;

  fetchCandidateDetails(recruiterName);

  const monthSelector = document.getElementById("month");

  if (monthSelector) {
    monthSelector.addEventListener("change", () => {
      const selectedMonth = monthSelector.value.toLowerCase();
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

async function fetchCandidateDetails(recruiterName, selectedMonth) {
  try {
    console.log("fetch shuru");
    const response = await fetch(
      `/recruiter_details?name=${recruiterName}`
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
    tableBody.innerHTML = "";

    let ActiveCount = 0;

    const candidatesArray = Object.values(candidates);
    console.log(candidatesArray);

    candidatesArray.forEach((candidate) => {
      const joinedAtDate = new Date(candidate.joinedAt);
      console.log(joinedAtDate);

      if (!isNaN(joinedAtDate)) {
        console.log("aarha");

        if (selectedMonth === undefined || (selectedMonth && joinedAtDate.getMonth() + 1 === selectedMonth)) {
          console.log("jldi");
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${candidate.name}</td>
            <td>${candidate.phone}</td>
            <td>${candidate.location}</td>
            <td>${candidate.jobInterest}</td>
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

          // Increment ActiveCount only if the candidate is active
          if (candidate.isActive) {
            ActiveCount++;
          }
        }
      } else {
        console.error(`Invalid joinedAt date for candidate: ${candidate.name}`);
      }
    });

    console.log("ActiveCount", ActiveCount);

    // Display ActiveCount in the <h2> element
    const activeCountElement = document.getElementById("Active-count");
    if (activeCountElement) {
      activeCountElement.textContent = `Total Active Count: ${ActiveCount}`;
    } else {
      console.error("Element with ID 'Active-count' not found.");
    }

  } catch (error) {
    console.error(error);
  }
}
