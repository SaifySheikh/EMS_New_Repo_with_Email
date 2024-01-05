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


document.addEventListener('DOMContentLoaded', () => {
  const userList = document.getElementById('userList');

  // Fetch and display data
  fetch('http://localhost:3000/client')
      .then(response => response.json())
      .then(data => {
          console.log('Fetched Data:', data);

          // Create a table
          const table = document.createElement('table');
          table.innerHTML = `
            <thead>
              <tr>
                <th>CompanyName</th>
                <th>Target Completed</th>
                <th>Requirement</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="userListBody"></tbody>
          `;

          // Loop through the data and populate the table
          const tbody = table.querySelector('#userListBody');
          data.forEach(user => {
              // Check if Target Completed is less than or equal to Requirement
              if (parseInt(user.Target_Completed) <= parseInt(user.Requirement)) {
                  const row = document.createElement('tr');
                  row.innerHTML = `
                      <td>${user.Company_Name}</td>
                      <td>${user.Target_Completed}</td>
                      <td>${user.Requirement}</td>
                      <td><button class="editButton" 
                        data-id="${user._id}" 
                        data-companyName="${user.Company_Name}" 
                        data-target="${user.Target_Completed}" 
                        data-requirement="${user.Requirement}">Edit</button></td>
                    `;
                  tbody.appendChild(row);
              }

          });

          // Append the table to an existing element in your HTML
          userList.appendChild(table);
      })
      .catch(error => console.error(error));

  // Handle "Edit" button click
  userList.addEventListener('click', async (e) => {
      if (e.target.classList.contains('editButton')) {
          const userId = e.target.getAttribute('data-id');
          const oldCompanyName = e.target.getAttribute('data-companyName');
const oldTarget = e.target.getAttribute('data-target');
const oldRequirement = e.target.getAttribute('data-requirement');

const newCompanyName = prompt(`Enter new CompanyName (Enter "${oldCompanyName}" to keep the previous value):`);
const newTarget = prompt(`Enter new Target Completed (Enter "${oldTarget}" to keep the previous value):`);
const newRequirement = prompt(`Enter new Requirement (Enter "${oldRequirement}" to keep the previous value):`);


          // Check if Target Completed is less than or equal to Requirement
          if (parseInt(newTarget) <= parseInt(newRequirement)) {
              console.log('Edit Button Clicked:', userId, newCompanyName, newTarget, newRequirement);

              try {
                  // Send a request to update the data
                  const response = await fetch(`http://localhost:3000/updateUser/${userId}`, {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                          Company_Name: newCompanyName,
                          Target_Completed: newTarget,
                          Requirement: newRequirement,
                      }), // Ensure property names match your MongoDB collection
                  });

                  const updatedUser = await response.json();

                  console.log('Updated User:', updatedUser);

                  // Update the UI with the new data
                  const row = e.target.closest('tr');
                  row.querySelector('td:nth-child(1)').textContent = updatedUser.Company_Name;
                  row.querySelector('td:nth-child(2)').textContent = updatedUser.Target_Completed;
                  row.querySelector('td:nth-child(3)').textContent = updatedUser.Requirement;
              } catch (error) {
                  console.error(error);
              }
          } else {
              alert('Target Completed must be less than or equal to Requirement.');
          }
      }
  });
});
