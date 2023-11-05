
const ErrorMiddleWare = (err,req,res,next) => {
    err.statusCode = err.statusCode || 5000
    err.message = err.message || "Something Went wrong!!"


    return res.status(err.statusCode).json({
        success : false,
        message : err.message,
        stack : err.stack
    })
}

export default ErrorMiddleWare;