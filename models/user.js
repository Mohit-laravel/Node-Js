const {Schema , model} = require("mongoose");
const {createHmac, randomBytes} = require("crypto");

const {createTokenForUser, validateToken} = require("../services/authentication");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt:  {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        default:"/images/user avatar.png"
    },
    role: {
        type: String,
        enum : ["USER", "ADMIN"],
        default: "USER"
    }
}, {timestamps: true});

userSchema.pre("save", function(next){
    const user = this;
    if(!user.isModified("password")) throw new Error("User is not modified");

    const salt = randomBytes(16).toString();
    const hashPassword = createHmac("sha256", salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashPassword;
    next();
});

userSchema.static('matchPasswordAndGenerateToken', async function(email, password){
    const user = await this.findOne({email});
    if(!user) throw new Error("Invalid Email");

    const hashPassword = createHmac("sha256", user.salt).update(password).digest("hex");

    if(user.password !== hashPassword) throw new Error("Invalid Password");

    const token = createTokenForUser(user);
    
    return token;
});

const user = model("users", userSchema);

module.exports = user;