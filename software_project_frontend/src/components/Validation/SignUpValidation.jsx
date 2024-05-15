
function SignUpValidation(values) {
    let error = {}
  
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
    if(values.firstName === ""){
      error.firstName = "First name should not be empty"
    }
  
    else{
      error.firstName = ""
    }

    if(values.lastName === ""){
      error.lastName = "Last name should not be empty"
    }
  
    else{
      error.lastName = ""
    }

    if(values.email === ""){
        error.email = "Email should not be empty"
    }

    else if(!email_pattern.test(values.email)){
        error.email = "Please enter a valid email addrsess!"
    }
    
    else{
    error.email = ""
    }

    if(values.password === ""){
      error.password = "Password should not be empty"
    }
  
    else if(!password_pattern.test(values.password)){
      error.password = "Password must contain at least one letter, one digit, and be at least 8 characters long."
    }
  
    else{
      error.password = ""
    }

    if(values.confirmPassword === ""){
        error.confirmPassword = "Confirm Password should not be empty"
      }
    
      else if(values.confirmPassword != values.password){
        error.confirmPassword = "Password didn't match"
      }
    
      else{
        error.confirmPassword = ""
      }


      if(values.designation === ""){
        error.designation = "Designation should not be empty"
      }
    
      else{
        error.designation = ""
      }
  
    return error;
  }
  
  export default SignUpValidation;
  