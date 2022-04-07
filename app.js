const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer"); //
const { exit } = require("process");
const employees = [];

function startApp () {
  inquirer.prompt([
    {
      type: "list",
      name:"options",
      choices:["Add Manager","Add Engineer","Add Intern", "Exit"]
    }
  ]) 
  .then(response => {
    switch (response.options) {
      case "Add Manager": 
        addManager();
        break;
      case "Add Engineer":
        addEngineer();
        break;
      case "Add Intern":
        addIntern();
        break;
      default:
        renderHTML();
        exit();
    }
  })
}

function addManager () {
  inquirer.prompt([
    {
      type: "input",
      message: "enter manager name:",
      name:"empname"
    },
    {
      type: "input",
      message: "enter manager id:",
      name:"empid"
    },
    {
      type: "input",
      message: "enter manager email:",
      name:"empemail"
    },
    {
      type: "input",
      message: "enter manager office number:",
      name:"empofficenumber"
    }
  ])
  .then(response => {
    let newManager = new Manager(response.empname, response.empid, response.empemail, response.empofficenumber);
    console.log(newManager);
    employees.push(newManager);
    startApp();
  })
}

function addEngineer () {
  inquirer.prompt([
    {
      type: "input",
      message: "enter engineer name:",
      name:"empname"
    },
    {
      type: "input",
      message: "enter engineer id:",
      name:"empid"
    },
    {
      type: "input",
      message: "enter engineer email:",
      name:"empemail"
    },
    {
      type: "input",
      message: "enter engineer github:",
      name:"empgithub"
    }
  ])
  .then(response => {
    let newEngineer = new Engineer(response.empname, response.empid, response.empemail, response.empgithub);
    console.log(newEngineer);
    employees.push(newEngineer);
    startApp();
  })
}

function addIntern () {
  inquirer.prompt([
    {
      type: "input",
      message: "enter intern name:",
      name:"empname"
    },
    {
      type: "input",
      message: "enter intern id:",
      name:"empid"
    },
    {
      type: "input",
      message: "enter intern email:",
      name:"empemail"
    },
    {
      type: "input",
      message: "enter intern school:",
      name:"empschool"
    }
  ])
  .then(response => {
    let newIntern = new Intern
    (response.empname, response.empid, response.empemail, response.empschool);
    console.log(newIntern);
    employees.push(newIntern);
    startApp();
  })
}

async function  renderHTML () {
  let data = await render(employees);
  console.log(data,"final HTML");
}

startApp();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
