import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUpButton from './SignUpButton';

describe('SignUpButton component', () => {
  test('renders button with "Sign Up" text', () => {
    const { getByText } = render(<SignUpButton />);
    expect(getByText('Sign Up')).toBeInTheDocument();
  });

  test('renders button with image and text', () => {
    const { getByAltText, getByText } = render(<SignUpButton />);
    expect(getByAltText('rs')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
  });

  test('calls onClick handler when button is clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(<SignUpButton onClick={onClick} />);
    const button = getByText('Sign Up');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // Add more test cases as needed
});
