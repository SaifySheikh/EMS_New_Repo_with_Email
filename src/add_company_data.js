const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = 3000;

const User = require("../model/company_data");

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb+srv://SaifySheikh:Sharif4565@cluster0.xbgnrhv.mongodb.net/EMS")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
    console.log("Database Can't Be Connected");
  });


const templatePath = path.join(__dirname, 'templates');
const publicPath = path.join(__dirname, 'public');


app.use(express.static(publicPath));

app.use(express.static(path.join(__dirname, 'src')));


app.use(express.static(templatePath));

app.get("/add_company_data.html", (req, res) => {
  const filePath = path.join(templatePath, "add_company_data.html");
  console.log("File Path:", filePath);
  res.sendFile(filePath);
  
});

app.post("/client.html", async (req, res) => {
  const filePath = path.join(templatePath, "client.html");
  console.log("File Path:", filePath);
  res.sendFile(filePath);
});


//yha se

const bodyParser = require("body-parser");

// Add the body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Handle POST request for form submission
// Handle POST request for form submission
app.post("/add_company_data", async (req, res) => {
  const companyData = new User(req.body);
  try {
    await companyData.save();
    console.log("Company data saved:", companyData);
    res.redirect("/admin.html"); // or wherever you want to redirect after saving
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});




//yha tak

app.listen(port, () => {
  console.log("App Running on port: ", port);
});
