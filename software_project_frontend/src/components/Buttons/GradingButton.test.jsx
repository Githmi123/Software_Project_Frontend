import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GradingButton from './GradingButton';
import { CheckCircle, Dashboard } from '@mui/icons-material';

describe('GradingButton component', () => {
  test('renders button with correct text and icon', () => {
    const { getByText, getByTestId } = render(
      <GradingButton text="Grade all files" icon={CheckCircle} />
    );
    expect(getByText('Grade all files')).toBeInTheDocument();
    expect(getByTestId('icon')).toBeInTheDocument();
  });

  test('calls onClick handler when button is clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <GradingButton text="Grade all files" icon={CheckCircle} onClick={onClick} />
    );
    const button = getByText('Grade all files');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('renders different icon when provided', () => {
    const { getByTestId, rerender } = render(
      <GradingButton text="Dashboard" icon={Dashboard} />
    );
    const icon = getByTestId('icon');
    expect(icon).toBeInTheDocument();

    rerender(<GradingButton text="Dashboard" icon={CheckCircle} />);
    expect(getByTestId('icon')).not.toBe(icon);
  });
});
