
function LoginValidation(values) {
  let error = {}

  const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if(values.username === ""){
    error.username = "Username should not be empty"
  }

  else{
    error.username = ""
  }

  if(values.password === ""){
    error.password = "Password should not be empty"
  }

  else if(!password_pattern.test(values.password)){
    error.password = "Please enter a valid passowrd!"
  }

  else{
    error.password = ""
  }

  return error;
}

export default LoginValidation;
