const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    //At least one lowercase letter ((?=.*[a-z])
    //At least one uppercase letter ((?=.*[A-Z])
    //At least one digit ((?=.*\d))
    //Length of at least 6 characters ([a-zA-Z\d]{6,})
    if (!passwordRegex.test(password)) {
      return false;
    }
  
    return true;
  };
  export default validatePassword;