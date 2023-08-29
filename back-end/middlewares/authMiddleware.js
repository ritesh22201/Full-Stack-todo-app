const jwt = require("jsonwebtoken");
const BlackListModel = require("../models/blackListModel");

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(400).send({ message: 'Access token not found' });
    }

    const blackListToken = await BlackListModel.findOne({ token })
    if (blackListToken) {
       return res.status(400).send({ message: 'Token revoked' });
    }

    jwt.verify(token, process.env.secretKey, async (err, decoded) => {
        if (err) {
            res.status(400).send({ message: 'Invalid token' });
        }
        else {
            req.body.userId = decoded.userId;
            req.body.name = decoded.name;
            next();
        }

    })

}


module.exports = auth;