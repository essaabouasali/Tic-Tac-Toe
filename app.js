const express = require(`express`);
const bodyParser = require('body-parser')
const Userlogin = require("./Data/user-login");
const { userdoesexist, creatuser } = require('./Data/Login-reposotory');
const app = express();
const port = 3000;


//Tell Express.js in which folder to find our template
app.set('views', './views');

//Tell express.js which template engine to use. this one is
//handlebars
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }))

//allow for static files e.g. .html, .css , .js to be requested in a responce
app.use(express.static('public'))


app.post('/login/loginPage', (req, res) => {

    let newuser = new Userlogin(req.body.usrname, req.body.pasw);
    if (userdoesexist(newuser)) {
        res.redirect('/main.html');
    }
    res.redirect('/login');
});
app.get('/login', (req, res) => {
    res.render('login', {
        active: true
    });
})

app.post('/sing-up/singUp', (req, res) => {
    let newusername = req.body.email;
    let newpassword = req.body.psw;
    let newrepatedpassword = req.body.pswrepeat;
    if (newpassword != newrepatedpassword) {
        // res.render('singUp', {
        //     active: true
        // })
        res.redirect('/sing-up/singUp.html');
    }
    let newuser = new Userlogin(newusername, newpassword);
    if (!userdoesexist(newuser)) {
        res.redirect('/sing-up/singUp.html');
    }
    creatuser(newuser);
    res.redirect("/sing-up");
});
app.get("/sing-up", (req, res) => {

    res.render('login', {
        active: false
    })
});

app.listen(port, function() {
    console.log("the express server is listening: http://localhost:" + port + "/myweb.html");
});