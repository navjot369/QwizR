import jwt from "jsonwebtoken"

const VerifyTokenStudent = async (req, res, next) => {
     const authToken = req.header('Authorization');
        console.log(authToken);
        if(!authToken) {
            return res.status(400).send("Bad request: Auth Student");
        }
    
        try {
            const decodedData = jwt.verify(authToken, config.jwtSecret);
            if(decodedData.type != "tutor") {
                return res.status(401).send("Not authorized");
            }
    
            const studentData = await Student.findOne({email: decodedData.email});
            if(!studentData) {
                return res.status(404).send("Not found");
            }
    
            req.body.studentId = studentData._id;
        } catch(err) {
            if(err.name == "TokenExpiredError") {
                return res.status(404).send("Token expired");
            }
            return res.status(500).send("Internal Server error while token validation");
        }
        next();
}

export default VerifyTokenStudent;