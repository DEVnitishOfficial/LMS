import User from "../models/userModel.js";
import AppErr from "../utils/errorUtils.js";
import jwt from 'jsonwebtoken'

const isLoggedIn = async (req,res,next) => {
    const  {token} = req.cookies;

    if(!token){
        return next(new AppErr('Unauthenticated user, please first login',401))
    }
    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetails;
    next()
}

const authorizedRoles = (...roles) =>  async(req,res,next) => { // creating clouser
    const currentUserRoles = req.user.role
    if(!roles.includes(currentUserRoles)){
        return next (new AppErr('You are not authorized to make this change',403))
    }
    next()

}
const authorizedSubscriber = async(req,res,next) => {
    const user = await User.findById(req.user.id)
    if(user.role !== 'ADMIN' && user.subscription.status !== 'active'){
        return next (new AppErr('please subscribe to access this route',403))
    }
    next()
}
    export {
        isLoggedIn,
        authorizedRoles,
        authorizedSubscriber
    }