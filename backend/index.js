import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
import routes from "./routes/appRoutes.js";
import session from "express-session";


const app = express();
const PORT = 4000;
const config = {
    // PORT: 3001,
    // MONGODB_URI: 'mongodb://127.0.0.1:27017/myDB_2',
    // ErrorPage: '<div style="display:flex; flex-direction:column; justify-content:center; align-items:center; width:100%; height:100%; margin:auto;"><h1>Oops!</h1><h4>Sorry, an unexpected error has occurred.</h4><h2>Page Not Found</h2></div>',
    SESSION_SECRET: 'QfyC5ZITwr',
    SESSION_MAX_AGE: 60*60*1000
}


// Mongo Connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/myDB_1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// bodyparser setup

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS Setup
app.use(cors());

// Session Setup
app.use(session({
    secret: config.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: config.SESSION_MAX_AGE
    }
}))

// Session Checking
app.use((req, res, next) => {
    console.log(req.session);
    next();
})

routes(app);

app.get('/', (req,res) => 
    res.send(`Our application is running on port ${PORT}`)
);

app.listen(PORT, () => 
    console.log(`Your server is running on port ${PORT}`)
);