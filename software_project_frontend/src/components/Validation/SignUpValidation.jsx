
function SignUpValidation(values) {
    let error = {}
  
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
    if(values.username === ""){
      error.username = "Username should not be empty"
    }
  
    else{
      error.username = ""
    }

    if(values.email === ""){
        error.email = "Email should not be empty"
    }

    else if(!email_pattern.test(values.email)){
        error.email = "Email didn't match"
    }
    
    else{
    error.email = ""
    }

    if(values.password === ""){
      error.password = "Password should not be empty"
    }
  
    else if(!password_pattern.test(values.password)){
      error.password = "Password didn't match"
    }
  
    else{
      error.password = ""
    }

    if(values.confirmpassword === ""){
        error.confirmpassword = "Password should not be empty"
      }
    
      else if(!password_pattern.test(values.confirmpassword)){
        error.confirmpassword = "Password didn't match"
      }
    
      else{
        error.confirmpassword = ""
      }
  
    return error;
  }
  
  export default SignUpValidation;
  