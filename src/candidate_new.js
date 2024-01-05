let arrow = document.querySelectorAll(".arrow");
  for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e)=>{
   let arrowParent = e.target.parentElement.parentElement;
   arrowParent.classList.toggle("showMenu");
    });
  }
  let sidebar = document.querySelector(".sidebar");
  let sidebarBtn = document.querySelector(".bx-menu");
  console.log(sidebarBtn);
  sidebarBtn.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
  });


  function getCurrentDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'short' };
    return now.toLocaleDateString('en-US', options);
}


document.getElementById('currentDate').innerText = getCurrentDate();


// candidate_new.js

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch candidate data from the server
        const response = await fetch("/candidate_details");
        console.log("Response:", response);
        const candidates = await response.json();

        const tableBody = document.getElementById("candidateTableBody");

        // Loop through the candidates and create table rows
        candidates.forEach(candidate => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${candidate.name}</td>
                <td>${candidate.phone}</td>
                <td>${candidate.location}</td>
                <td>${candidate.jobInterest}</td>
                <td>${new Date(candidate.joinedAt).toLocaleDateString()}</td>
                <td>${candidate.isActive ? "Active" : "Inactive"}</td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error(error);
    }
});
