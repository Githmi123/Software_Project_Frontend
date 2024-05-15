import LoginValidation from './LoginValidation';

describe('LoginValidation function', () => {
  test('should return an error object with messages for empty username and password', () => {
    const values = {
      username: '',
      password: '',
    };

    const errors = LoginValidation(values);

    expect(errors.username).toBe('Username should not be empty');
    expect(errors.password).toBe('Password should not be empty');
  });

  test('should return an error object with message for invalid password', () => {
    const values = {
      username: 'john.doe',
      password: 'password',
    };

    const errors = LoginValidation(values);

    expect(errors.password).toBe('Please enter a valid passowrd!');
  });


});
