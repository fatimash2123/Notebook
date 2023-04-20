const jwt = require("jsonwebtoken")
const { secretKey } = require("../../data")

module.exports = async(req, res, next) => {
    const {authorization} = req.headers;
    //if token is not given in header
    if (!authorization) {
        res.status(401).json({ "error": "token not specified" })
    }
    else {
        try {
            const token=authorization.replace("Bearer ","");
            const details = await jwt.verify(token, secretKey);
            req.user = details.user;
            console.log(res.user)
            next();
        }
        catch (err) {
            console.log("in catch or fetch user")
            console.log(err)
            res.status(401).json({ "error": "token not specified" })

        }
    }
}
