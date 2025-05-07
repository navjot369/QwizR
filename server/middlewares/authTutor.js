import jwt from "jsonwebtoken"
import config from "../config/config.js";
import Tutor from "../models/tutor.model.js";

const VerifyTokenTutor = async (req, res, next) => {
    const authToken = req.header('Authorization');
    console.log(authToken);
    if(!authToken) {
        return res.status(400).send("Bad request: Auth Tutor");
    }

    try {
        const decodedData = jwt.verify(authToken, config.jwtSecret);
        if(decodedData.type != "tutor") {
            return res.status(401).send("Not authorized");
        }

        const tutorData = await Tutor.findOne({email: decodedData.email});
        if(!tutorData) {
            return res.status(404).send("Not found");
        }

        req.body.tutorId = tutorData._id;
    } catch(err) {
        if(err.name == "TokenExpiredError") {
            return res.status(404).send("Token expired");
        }
        return res.status(500).send("Internal Server error while token validation");
    }
    next();
}

export default VerifyTokenTutor;