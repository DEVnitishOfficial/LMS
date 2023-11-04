class AppErr extends Error {
    /**
     * The extends keyword is used to create a new class (AppErr) that inherits from another class (Error in this case). This is known as class inheritance and allows you to create a new class that inherits properties and methods from an existing class.
     */
  constructor(message, statusCode) {
    super(message); 
    /**
     * The super keyword is used inside the constructor of the AppErr class to call the constructor of its parent class, which is Error. This is necessary because the Error class itself has its own constructor, and by calling super(message), you pass the message argument to the constructor of the Error class.
In this case, message is typically the error message that you want to associate with this custom error object. It is set as the error message for the AppErr object by calling the super(message).
     */
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppErr;
