import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "user name is Required"],
      custom_minLength: [5, "Name must be at least 5 characters"],
      custom_maxLength: [50, "Name must be less than 50 characters"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "user email is required"],
      unique: true,
      lowercase: true,
      unique: [true, "already registered"],
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please entre a valid email address(db)",
      ],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "password must be at lest eight character"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"], // enum → enumeration(means,consists of a set of distinct named values.)
      default: "USER",
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    subscription : {
      id : String,
      status : String
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password,10) // here, 10(cost factor) represents the number of rounds or iterations that the bcrypt hashing algorithm should use when hashing the password.

    // The actual number of iterations is calculated as 2^rounds. So, if you set a cost factor of 10, it means that bcrypt will internally perform 2^10 (1024) iterations during the hashing process.

    // hence,bcrypt will perform 1024 iterations of its internal hashing algorithm on the provided password
})

userSchema.methods = {
    generateJWTToken : function(){
       return jwt.sign(
        {id : this._id, email : this.email, subscription : this.subscription, role : this.role},
         process.env.JWT_SECRET ,
        {
            expiresIn : process.env.JWT_EXPIRY
        }
        )
    },
    comparePassword : async function(plainTextPassword){
      return await bcrypt.compare(plainTextPassword,this.password)
    },

    generateForgotPasswordToken : function(){
      const forgotToken = crypto.randomBytes(20).toString('hex')
      this.forgotPasswordToken = crypto
      .createHash('sha256')
      .update(forgotToken)
      .digest('hex');

      this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000 // 15 min

      return forgotToken

    },
}

const User = model("LMS_USER2", userSchema);

export default User;
