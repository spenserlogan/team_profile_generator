const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./library/engineer");
const Manager = require("./library/manager");
const Intern = require("./library/intern");

let manager = [];
let engineer = [];
let intern = [];

function initApp() {
    questions();
    generatePage()
}

function questions() {
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "Enter Employees name"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employees id?"
    },
    {
        type: "input",
        name: "role",
        type: "list",
        message: "What is the employees role?",
        choices: [
            "Intern",
            "Engineer",
            "Manager"
        ]
    },
    {
        type: "input",
        name: "email",
        message: "What is the employees email?"
    }])
    .then(({name, id, role, email}) => {
        // let newEmployee = "";
        if(role === "Engineer") {
            return inquirer.prompt([{
                type:"input",
                name: "github",
                message: "What is the enginners github?"
            },
            {
                type: "list",
                name: "newEmployee",
                message: "Would you like to add a new employee?",
                default: false,
                choices: [
                    "yes",
                    "no"
                ]
            }
        ])
        .then(({github, newEmployee}) => {
            let member = new Engineer(name, id, email, github);
            engineer.push(member)
            addMemberPage(member);
            if(newEmployee === "no") {
                return finishMemberPage();
            }
            else{
                questions();
            }
        })
        } else if(role === "Intern") {
            return inquirer.prompt([{
                type: "input",
                name: "school",
                message: "What school did the intern attend?"
            },
            {
                type: "list",
                name: "newEmployee",
                message: "Would you like to add a new employee?",
                default: false,
                choices: [
                    "yes",
                    "no"
                ]
            }
        ])
        .then(({school, newEmployee}) => {
            let member = new Intern(name, id, email, school)
            intern.push(member)
            addMemberPage(member);
            if(newEmployee === "no") {
                return finishMemberPage();
            }
            else{
                questions();
            }
        })
        }else if(role === "Manager") {
            return inquirer.prompt([{
                type: "input",
                name: "officeNum",
                message: "What is the managers office number?"
            },
            {
                type: "list",
                name: "newEmployee",
                message: "Would you like to add a new employee?",
                default: false,
                choices: [
                    "yes",
                    "no"
                ]
            }
        ])
        .then(({officeNum, newEmployee}) => {
            let member = new Manager(name, id, email, officeNum)
            manager.push(member)
            addMemberPage(member);
            if(newEmployee === "no") {
                return finishMemberPage();
            }
            else{
                questions();
            }
        })
        }
    });

};

function generatePage() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-light bg-light mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./dist/team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
};

function addMemberPage(member) {
    return new Promise(function(resolve, reject) {
        console.log("member", member)
        const role = member.getRole();
        let data = "";

        if(role === "Engineer") {
            const github = member.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${member.name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${member.id}</li>
                <li class="list-group-item">Email Address: ${member.email}</li>
                <li class="list-group-item">GitHub: ${github}</li>
            </ul>
        </div>`
        }else if(role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${member.name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${member.id}</li>
                <li class="list-group-item">Email Address: ${member.email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
        </div>`
        }else {
            console.log(member)
            const officeNum = member.getOfficeNumber();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${member.name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${member.id}</li>
                <li class="list-group-item">Email Address: ${member.email}</li>
                <li class="list-group-item">Office Number: ${officeNum}</li>
            </ul>
        </div>`
        }
        fs.appendFile("./dist/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        }); 
    });
}

function finishMemberPage() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./dist/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
}


initApp();