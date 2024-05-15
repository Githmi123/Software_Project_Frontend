import SignUpValidation from './SignUpValidation';

describe('SignUpValidation function', () => {
  test('should return an error object with messages for each field if all fields are empty', () => {
    const values = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      designation: ''
    };

    const errors = SignUpValidation(values);

    expect(errors.firstName).toBe('First name should not be empty');
    expect(errors.lastName).toBe('Last name should not be empty');
    expect(errors.email).toBe('Email should not be empty');
    expect(errors.password).toBe('Password should not be empty');
    expect(errors.confirmPassword).toBe('Confirm Password should not be empty');
    expect(errors.designation).toBe('Designation should not be empty');
  });

  test('should return an error object with messages for invalid email and password', () => {
    const values = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalidemail',
      password: 'password',
      confirmPassword: 'password',
      designation: 'Developer'
    };

    const errors = SignUpValidation(values);

    expect(errors.email).toBe('Please enter a valid email addrsess!');
    expect(errors.password).toBe('Password must contain at least one letter, one digit, and be at least 8 characters long.');
  });

  test('should return an error object with message for password mismatch', () => {
    const values = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password',
      designation: 'Developer'
    };

    const errors = SignUpValidation(values);

    expect(errors.confirmPassword).toBe('Password didn\'t match');
  });

  test('should return an error object with message for firstName is empty', () => {
    const values = {
      firstName: '',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      designation: 'Developer'
    };

    const errors = SignUpValidation(values);

    expect(errors.firstName).toBe('First name should not be empty');
  });


  test('should return an error object with message for last name is empty', () => {
    const values = {
      firstName: 'Isaac',
      lastName: '',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      designation: 'Developer'
    };

    const errors = SignUpValidation(values);

    expect(errors.lastName).toBe('Last name should not be empty');
  });

  test('should return an error object with message for email is empty', () => {
    const values = {
      firstName: 'Isaac',
      lastName: 'Doe',
      email: '',
      password: 'password123',
      confirmPassword: 'password123',
      designation: 'Developer'
    };

    const errors = SignUpValidation(values);

    expect(errors.email).toBe('Email should not be empty');
  });

  test('should return an error object with message for password is empty', () => {
    const values = {
      firstName: 'Isaac',
      lastName: 'Doe',
      email: 'abc@gmail.com',
      password: '',
      confirmPassword: 'password123',
      designation: 'Developer'
    };

    const errors = SignUpValidation(values);

    expect(errors.password).toBe('Password should not be empty');
  });


  test('should return an error object with message for conmfirm password is empty', () => {
    const values = {
      firstName: 'Isaac',
      lastName: 'Doe',
      email: 'abc@gmail.com',
      password: 'password123',
      confirmPassword: '',
      designation: 'Developer'
    };

    const errors = SignUpValidation(values);

    expect(errors.confirmPassword).toBe('Confirm Password should not be empty');
  });



  test('should return an error object with message for designation is empty', () => {
    const values = {
      firstName: 'Isaac',
      lastName: 'Doe',
      email: 'abc@gmail.com',
      password: 'password123',
      confirmPassword: 'password123',
      designation: ''
    };

    const errors = SignUpValidation(values);

    expect(errors.designation).toBe('Designation should not be empty');
  });



  test('should return an error object with messages for both first name and last name are empty', () => {
    const values = {
      firstName: '',
      lastName: '',
      email: 'abc@gmail.com',
      password: 'password123',
      confirmPassword: 'password123',
      designation: 'Senior Lecturer'
    };

    const errors = SignUpValidation(values);

    expect(errors.firstName).toBe('First name should not be empty');
    expect(errors.lastName).toBe('Last name should not be empty');
  });


  test('should return an error object with messages for both first name and email are empty', () => {
    const values = {
      firstName: '',
      lastName: 'Perera',
      email: '',
      password: 'password123',
      confirmPassword: 'password123',
      designation: 'Senior Lecturer'
    };

    const errors = SignUpValidation(values);

    expect(errors.firstName).toBe('First name should not be empty');
    expect(errors.email).toBe('Email should not be empty');
  });


  test('should return an error object with messages for both first name and password are empty', () => {
    const values = {
      firstName: '',
      lastName: 'Perera',
      email: 'abc@gmail.com',
      password: '',
      confirmPassword: 'password123',
      designation: 'Senior Lecturer'
    };

    const errors = SignUpValidation(values);

    expect(errors.firstName).toBe('First name should not be empty');
    expect(errors.password).toBe('Password should not be empty');
  });


  test('should return an error object with messages for both first name and confirm password are empty', () => {
    const values = {
      firstName: '',
      lastName: 'Perera',
      email: 'abc@gmail.com',
      password: 'password123',
      confirmPassword: '',
      designation: 'Senior Lecturer'
    };

    const errors = SignUpValidation(values);

    expect(errors.firstName).toBe('First name should not be empty');
    expect(errors.confirmPassword).toBe('Confirm Password should not be empty');
  });


  test('should return an error object with messages for both first name and designation are empty', () => {
    const values = {
      firstName: '',
      lastName: 'Perera',
      email: 'abc@gmail.com',
      password: 'password123',
      confirmPassword: 'password123',
      designation: ''
    };

    const errors = SignUpValidation(values);

    expect(errors.firstName).toBe('First name should not be empty');
    expect(errors.designation).toBe('Designation should not be empty');
  });

  test('should return an error object with messages for both first name and designation are empty', () => {
    const values = {
      firstName: '',
      lastName: 'Perera',
      email: 'abc@gmail.com',
      password: 'password123',
      confirmPassword: 'password123',
      designation: ''
    };

    const errors = SignUpValidation(values);

    expect(errors.firstName).toBe('First name should not be empty');
    expect(errors.designation).toBe('Designation should not be empty');
  });




});
