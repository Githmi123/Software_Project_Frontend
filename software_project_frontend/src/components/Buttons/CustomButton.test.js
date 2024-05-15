import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomButton from './CustomButton';

describe('CustomButton component', () => {
  test('renders button with correct text', () => {
    const { getByText } = render(<CustomButton text="Click me" />);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(<CustomButton text="Click me" onClick={onClick} />);
    fireEvent.click(getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });

  test('renders button with custom styles', () => {
    const { getByText } = render(
      <CustomButton
        text="Custom Style"
        backgroundColor="red"
        textColor="white"
        onClick={() => {}}
      />
    );
    const button = getByText('Custom Style');
    expect(button).toHaveStyle('background-color: red');
    expect(button).toHaveStyle('color: white');
    expect(button).toHaveStyle('width: 20vh');
    expect(button).toHaveStyle('text-transform: capitalize');
    expect(button).toHaveStyle('border: 2px solid #7894DB');
  });
});

