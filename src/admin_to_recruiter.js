


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


document.addEventListener("DOMContentLoaded", async () => {
  try {
      const response = await fetch("/admin_data");
      const admins = await response.json();

      const tableBody = document.getElementById("adminTableBody");

      admins.forEach(admin => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${admin.name}</td>
              <td>${admin.hiredCandidates}</td>
              <td>${admin.activeCandidates}</td>
              <td>${admin.email}</td>
              <td>${admin.phone}</td>
              <td><button class="detailButton" onclick="showDetails('${admin.name}', '${admin.phone}')">Detail</button></td>
              <td><button class="sendButton" onclick="TakeToSendEmail('${admin.email}')">Send Data</button></td>
          `;
          tableBody.appendChild(row);
      });


  } catch (error) {
      console.error(error);
  }
});

function showDetails(recruiterName,recruiterNumber) {
  console.log("Recruiter Name:", recruiterName);
console.log("Recruiter Number:", recruiterNumber);

const adminNameElement = document.getElementById("admin-name");
const adminNumberElement = document.getElementById("admin-Number");

console.log(adminNameElement, adminNumberElement);

if (adminNameElement && adminNumberElement) {
    adminNameElement.textContent = recruiterName;
    adminNumberElement.textContent = recruiterNumber;
    window.location.href = `/admin_to_recruiter-details.html?name=${recruiterName}&phone=${recruiterNumber}`;
} else {
    console.error("Element with ID 'admin-Number' not found.");
}

}
function TakeToSendEmail(Emailid) {
    // Encode the Emailid to ensure it's properly formatted in the URL
    const encodedEmailid = encodeURIComponent(Emailid);

    // Redirect to sendEmail.html with Emailid as a URL parameter
    window.location.href = `sendEmail.html?email=${encodedEmailid}`;
}
