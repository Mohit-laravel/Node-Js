const JWT = require("jsonwebtoken");
const User = require("../models/user");
const secret = "secret";

function createTokenForUser(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
        profileImageUrl: user.profileImageUrl
    }
    $token = JWT.sign(payload, secret);

    return $token;
}

function validateToken(token) {
    return JWT.verify(token, secret);
}

module.exports = {createTokenForUser, validateToken}