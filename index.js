const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const Engineer = require("./library/engineer");
const Manager = require("./library/manager");
const Intern = require("./library/intern");
const Prompt = require("inquirer/lib/prompts/base");

const manager = [];
const engineer = [];
const intern = [];
const employeeArr = {engineer, intern, manager};

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
                choices: [
                    "yes",
                    "no"
                ]
            }
        ])
        .then(({github, newEmployee}) => {
            engineer.push(new Engineer(name, id, email, github))
            if(newEmployee) {
                return Prompt();
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
                choices: [
                    "yes",
                    "no"
                ]
            }
        ])
        .then(({school, newEmployee}) => {
            engineer.push(new Intern(name, id, email, school))
            if(newEmployee) {
                return Prompt();
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
                choices: [
                    "yes",
                    "no"
                ]
            }
        ])
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
    fs.writeFile("./output/team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
};

function addMemberPage() {
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const id = member.getId();
        const role = member.getRole();
        const email = member.getEmail();
        let data = "";

        if(role === "Engineer") {
            const github = member.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h2 class="card-header">${name}<br /><br />Engineer</h2>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${github}</li>
            </ul>
            </div>`
        }else if(role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h2 class="card-header">${name}<br /><br />Intern</h2>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${school}</li>
            </ul>
            </div>`
        }else {
            const officeNum = member.getOfficeNumber();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h2 class="card-header">${name}<br /><br />Manager</h2>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${officeNum}</li>
            </ul>
            </div>`
        }
        fs.appendFile("./output/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        }); 
    });
}