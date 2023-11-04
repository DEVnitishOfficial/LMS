import User from "../models/userModel";
import AppErr from "../utils/errorUtils";

const cookieOptions = {
    maxAge : 24*7*60*60*1000, // 7 day
    httpOnly : true,
    secure : true
}

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
    avtar: {
      public_id: email,
      secure_url:
        "https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_640.jpg",
    },
  });

  if (!user) {
    return next(new AppErr("User Registrantion failed, please try agian", 400));
  }

  // TODO : file upload

  await user.save();

  user.password = undefined;

  const jwtToken = await user.generateJWTToken();
  res.cookie('token',token,cookieOptions)

  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    user,
  });
};

const login = (req, res) => {};

const logOut = (req, res) => {};

const getProfile = (req, res) => {};

export { register, login, logOut, getProfile };
