import express from "express";
import mongoose from "mongoose"; // Data Base
import cors from "cors"; // for Cross-Origin

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect("mongodb+srv://Parth:Naruto451@cluster0.56u09.mongodb.net/Hotel?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} , () => {
    console.log("mongo is connected")
});

const userSchema = new mongoose.Schema( {
    name : { type : String},
    email :{ type : String},
    password : { type : String},
});

const User = new mongoose.model("User" , userSchema);


//Routes

app.get("/" , (req, res)=>{
    res.send("My api")
})

app.post("/login",(req ,res) => {
    res.send("my API login")
})


app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            console.log(user)
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

app.listen(9002 , () => {
    console.log("backend started at port 9002")
})