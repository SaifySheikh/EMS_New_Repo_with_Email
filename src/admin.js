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


function adminLogout() {
  // Redirect to index.html with a timestamp parameter
  const timestamp = new Date().getTime();
  window.location.replace(`index.html?timestamp=${timestamp}`);
}


// Attach the click event to the logout icon
document.getElementById('admin-logout').addEventListener('click', adminLogout);
