import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();


const joke = "Select your parameters to generate a joke with";
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/", async (req, res) => {

    try{
        const request = await axios.get(`https://v2.jokeapi.dev/joke/Dark?blacklistFlags=religious&type=single`);
        const joke = request.data.joke;
        res.render("index.ejs", {joke:joke});
    }catch(err){
        console.log(err);
        res.render("index.ejs", {joke:"An error occured while generating your joke"});
    }

    
})


app.post("/", async (req, res) => {

    let blackListFlags = ['religious'];

    try{
        Object.keys(req.body).map((key) => [key, req.body[key]]).forEach(element => {
            if(element[1] === "on"){
                blackListFlags.push(element[0]);
            }
        });

        const request = await axios.get(`https://v2.jokeapi.dev/joke/Dark?blacklistFlags=${blackListFlags.join(',')}&type=single`);
        const joke = request.data.joke;


        res.render("index.ejs", {joke:joke});

    }catch(err){
        console.log(err);
        res.render("index.ejs", {joke:"An error occured while generating your joke"});
    }
})



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})


