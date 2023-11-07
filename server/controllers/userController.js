import { json } from "express";
import User from "../models/userModel.js";
import AppErr from "../utils/errorUtils.js";
import cloudinary from 'cloudinary'
import fs from 'fs/promises'
import sendEmail from "../utils/sendEmail.js";

const cookieOptions = {
    maxAge : 24*7*60*60*1000, // 7 day
    httpOnly : true,
    secure : true
}

/******************************************************
 * @REGISTER
 * @route /api/v1/user/register
 * @method POST
 * @description register function for creating new user
 * @body fullName, email, password
 * @returns user Object
 ******************************************************/
const register = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  if ((!fullName, !email, !password)) {
    return next(new AppErr("All fields are required", 400));
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    return next(new AppErr("user already exist", 400));
  }

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url:
        "https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_640.jpg",
    },
  });

  if (!user) {
    return next(new AppErr("User Registrantion failed, please try agian", 400));
  }

  console.log('files details > ',JSON.stringify(req.file))

    if(req.file) {
      try{
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder : 'lms',
          width : 250,
          height : 250,
          gravity : 'faces',
          crop : 'fill'
        })

        console.log('Upload Result:', result);

        if(result){
          console.log('result',result)
          user.avatar.public_id = result.public_id
          user.avatar.secure_url = result.secure_url

          // remove file from the server
          fs.rm(`uploads/${req.file.filename}`)
        }
      }catch(error){
        return(
          next(new AppErr(error.message, error.stack, error.name || 'file not uploaded, Please try again', 500))
        )
      }
    }

  await user.save(); 
  user.password = undefined;

  const token = await user.generateJWTToken();
  res.cookie('token',token,cookieOptions)

  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    user,
  });
};

/******************************************************
 * @LOGIN
 * @route /api/v1/user/login
 * @method POST
 * @description verify user and send cookie with jwt token
 * @body email , password
 * @returns User Object , cookie
 ******************************************************/
const login = async (req, res, next) => {
    try {
      const {email, password} = req.body
      if(!email || !password){
          return next(new AppErr('Email and Password both are required',400))
      }
  
      const user = await User.findOne({
          email
      }).select('+password')
  
      if(!user || !user.comparePassword(password)){
          return next(new AppErr('Email or Password does not match',400))
      }
  
      const token = await user.generateJWTToken()
      user.password = undefined
  
      res.cookie('token',token, cookieOptions)
      res.status(200).json({
        success : true,
        message : 'user loggedIn successfully',
        user
      })
    } catch (error) {
      return next(new AppErr(error.message,500))
    }
};

/******************************************************
 * @LOGOUT
 * @route /api/v1/user/logout
 * @method GET
 * @description Remove the token from  cookie
 * @returns logout message and cookie without token
 ******************************************************/
const logOut = (req, res) => {
  res.cookie('token',null, {
    secure : true,
    maxAge : 0,
    httpOnly : true
  })
  res.status(200).json({
    success : true,
    message : 'User logged out successfully'
  })
};

/******************************************************
 * @GETPROFILE
 * @route /api/v1/user/getProfile
 * @method GET
 * @description retrieve user data from mongoDb if user is valid(jwt auth)
 * @returns User Object
 ******************************************************/
const getProfile = (req, res, next) => {
  try {
    const userId = req.user.id
    const user = User.findById(userId)
  
    res.status(200).json({
      success : true,
      message : 'user details retrieve successfully',
      user
    })
  } catch (error) {
    return next(new AppErr('Failed to retrieve User details',500))
  }
};


/******************************************************
 * @FORGOTPASSWORD
 * @route /api/v1/user/forgotPassword
 * @method POST
 * @description get the forgot password token
 * @returns send email to the user mail to get his new password
 ******************************************************/
const forgotPassword = async (req,res,next) => {
  const {email} = req.body

  if(!email){
    return next(new AppErr('Email required to forget password',400))
  }

    const user = await User.findOne({email})
    if(!user){
      return next(new AppErr('Provided email is not registered',400))
    }

    const forgotToken = await user.generateForgotPasswordToken()

    await user.save();
    const forgotPasswordUrl = `${process.env.FRONTEND_URL}/resetPassword/${forgotToken}`;

      const subject = 'Forgot Password'
      const message = `You can reset your password using <a href= ${forgotPasswordUrl} target="_blank"> Reset your password</a>.\n if the above link doesn't work then copy paste this link ${forgotPasswordUrl} into the new tab.\n if you have not requested this please Ignore it.`
    try{
      await sendEmail(email,subject, message);
      res.status(200).json({
        success : true,
        message : `Forgot password token has been sent to the ${email} successfully`
      })
    }catch(error){
      user.forgotPasswordExpiry = undefined
      user.forgotPasswordToken = undefined
      return next(new AppErr(error.message, 500))
    }
}
const resetPassword = (req,res,next) => {
  
}


export { register, login, logOut, getProfile, forgotPassword, resetPassword, };
