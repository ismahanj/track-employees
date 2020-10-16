
const mysql = require("mysql")
const inquirer = require("inquirer")

const connection = mysql.createConnection({
    host: "localhost",

    port: process.env.Port || 3306,

    user: "root",

    password: "password",

    database: "tracker_db"
})

connection.connect(function (err){
    if (err) throw err
    prompt()
})

function prompt(){
    inquirer.prompt({
        name:"questions", 
        message:"what do you want to do", 
        type:"list", 
        choices:["add department", "add role", "add employee", "quit"]
    }).then(function(answers){
        if(answers.questions === "add department"){
            addDepartment()
        } else if(answers.questions === "add role"){
            addRole()
        } else if (answers.questions === "add employee"){
            addEmployee()
        } else {
            connection.end()
        }
    }) 
}

    function addDepartment(){
        inquirer.prompt({
            name: "name",
            type: "input",  
            message: "enter the department"
       
    }).then(function(answer){
        
        connection.query("INSERT INTO department SET ?", { department_name: answer.name }, function (err) {
            if (err) throw err
            prompt()
        })
    })
}

function addEmployee() {
    connection.query("SELECT * FROM roles", function (err, data) {
        if (err) throw err

        let roleArr = data.map(function(role){
            return {
                name: role.title,
                value: role.id
            }
        })  
    connection.query("SELECT * FROM emp", function (err, data) {   
        if (err) throw err
        let managerArr = data.map(function(manager){
            return{
                name: manager.first_name + manager.last_name,
                value: manager.id
            }
        })           
    inquirer.prompt([
        {
          name: "first",
          type: "input",
          message: "what is the first name of the employee?"
        }, 
        {
            name: "last",
            type: "input",
            message: "what is the last name of the employee?"
        },
 
         {
            name: "roleId",
            type: "list",
            message: "What is the role of this employee's role",
            choices: roleArr
            },
            {
                name:"manager", 
                type: "list", 
                message: "does the employee have a manager", 
                choices: managerArr
            }  
            
        
    ]).then(function (answers) {
            connection.query("INSERT INTO emp SET ?", {
                first_name: answers.first,
                last_name: answers.last, 
                role_id: answers.roleId,
                


            }, function (err) {
                if (err) throw err
                prompt()
            })
        })
    })
})
}
function addRole (){
    // var query = "SELECT department.id, department.title, roles.department_id"; 
    //         query += "FROM department INNER JOIN roles ON (roles.department_id = department.id AND department.title)"; 
    //         query += "= roles.department_id WHERE (roles.department_id = ?) ORDER BY department.id AND department.title"; 

    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err

        let depArr = data.map(function (dep) {
            return {
                name: dep.department_name,
                value: dep.id
            }
        })
        inquirer.prompt([
            {
                name: "title", 
                type:"input", 
                message:"what is the job title"
            }, 
            {
                name:"salary", 
                type:"input", 
                message:"what is the salary of this position"
            }, 
            {
                name: "depId",
                type: "list",
                message: "What is the department does this role belong to",
                choices: depArr
                },
            ]).then(function (answers) {
            
        connection.query("INSERT INTO roles SET ?", {
            title: answers.title,
            salary: answers.salary,
            department_id: answers.depId
    }, function (err) {
        if (err) throw err
        prompt()
    })
    })
})

}
