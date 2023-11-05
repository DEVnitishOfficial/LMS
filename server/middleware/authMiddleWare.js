import AppErr from "../utils/errorUtils.js";
import jwt from 'jsonwebtoken'

const isLoggedIn = async (req,res,next) => {
    const  {token} = req.cookie;

    if(!token){
        return next(new AppErr('Unauthenticated user, please first login',401))
    }
    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetails;
    next()
}
    export {
        isLoggedIn
    }