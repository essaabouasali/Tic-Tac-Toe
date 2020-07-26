let userlogin = [{
        username: "essa@outlook.com",
        passowred: "Essa"
    },
    {
        username: "dani.outlook.com",
        passowred: "Dani"
    }
];

const fs = require('fs');
const path = require("path");
const { json } = require('body-parser');

function creatuser(user) {

    userlogin.push(user);
    const baseFilePATH = path.join(__dirname, "login.json");
    fs.writeFileSync(baseFilePATH, JSON.stringify(userlogin));
}

function userdoesexist(user) {

    return userlogin.some(e => e.username == user.username && e.passowred == user.passowred);
}

module.exports = { creatuser, userdoesexist };