require('dotenv').config();
var express = require('express'),
 cors = require('cors'),
 bodyParser = require('body-parser'),
 passport = require('passport'),
 mongoose = require('mongoose'),
 path = require('path'),
 app = express();

const port = process.env.PORT || 8080;

//Database connection
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});
mongoose.connection.on('connected',() => {
    console.log("connected to DB");
});

mongoose.connection.on('error',(err) => {
    console.log('error while connecting to DB: ' + err);
});
//

//----- Middlewares -----//

app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//set a static folder
app.use(express.static(path.join(__dirname,'public')));

var UserRoutes = require('./routes/users');
app.use('/users', UserRoutes);

//----------------------//

app.get('/', (req,res) => {
    res.send('hello')
})

app.listen(port, () => {
    console.log("app started on port: " + port);
})