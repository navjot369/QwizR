import express from "express";
import Student from "../models/student.model.js";
import Tutor from "../models/tutor.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('User route');
});

router.post('/register', async (req, res) => {
    const data = req.body;
    if(!data) {
        return res.status(400).send({message: "Invalid response recieved"});
    }

    const ifExistsStudent = await Student.exists({email: data.email});
    console.log(ifExistsStudent);
    if(ifExistsStudent) {
        return res.status(404).send({message: "Email already registered"});
    }

    const ifExistsTutor = await Tutor.exists({email: data.email});
    if(ifExistsTutor) {
        return res.status(404).send({message: "Email already registered"});
    }

    let encryptedPassord = "";
    try {
        encryptedPassord = bcrypt.hashSync(data.password, 10);
    } catch(err) {
        return res.status(500).send({message: "Internal Server Error"});
    }

    if(data.userType == "student") {
        const newStudent = new Student({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: encryptedPassord
        });
        newStudent.save()
            .then(() => res.status(201).send({ message: "Student registered successfully" }))
            .catch(err => res.status(500).send({ message: "Error registering student", error: err }));
        return;
        
    }else if(data.userType == "tutor") {
        const newTutor = new Tutor({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: encryptedPassord
        });
        newTutor.save()
            .then(() => res.status(201).send({ message: "Tutor registered successfully" }))
            .catch(err => res.status(500).send({ message: "Error registering tutor", error: err }));
        return;
    }

    return res.status(500).send({message: "Internal Server Error"});
})

router.post("/login/student", async (req, res) => {
    const data = req.body;
    if(!data) {
        return res.status(400).send({message: "Invalid response recieved"});
    }

    const email = data.email;
    if(!email) {
        return res.status(400).send({message: "Invalid response recieved"});
    }

    try {
        const student = await Student.findOne({email}).select("+password");
        if(!student) {
            return res.status(404).send({message: "Invalid credentials"});
        }
        const isPasswordSame = await bcrypt.compare(data.password, student.password);
        if(!isPasswordSame) {
            return res.status(404).send({message: "Invalid credentials"});
        }
        const token = jwt.sign({email, type: "student"}, config.jwtSecret,
             {expiresIn: config.jwtExpiresIn});
        
        return res.status(200).send({token, message: "Log in successful"});


    } catch(err) {
        console.log(err);
        return res.status(500).send({message: "Internal Server Error", err});
    }
});

router.post("/login/tutor", async (req, res) => {
    const data = req.body;
    if(!data) {
        return res.status(400).send({message: "Invalid response recieved"});
    }

    const email = data.email;
    if(!email) {
        return res.status(400).send({message: "Invalid response recieved"});
    }

    try {
        const tutor = await Tutor.findOne({email}).select("+password");
        if(!tutor) {
            return res.status(404).send({message: "Invalid credentials"});
        }
        const isPasswordSame = await bcrypt.compare(data.password, tutor.password);
        if(!isPasswordSame) {
            return res.status(404).send({message: "Invalid credentials"});
        }
        const token = jwt.sign({email, type: "student"}, config.jwtSecret,
             {expiresIn: config.jwtExpiresIn});
        
        return res.status(200).send({token, message: "Log in successful"});


    } catch(err) {
        console.log(err);
        return res.status(500).send({message: "Internal Server Error", err});
    }
});

export default router;