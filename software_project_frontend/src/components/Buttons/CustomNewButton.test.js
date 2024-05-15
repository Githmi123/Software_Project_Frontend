import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomNewButton from './CustomNewButton';

describe('CustomNewButton component', () => {
  test('renders button with correct text', () => {
    const { getByText } = render(<CustomNewButton text="Upload" />);
    expect(getByText('Upload')).toBeInTheDocument();
  });

  test('calls onFileSelect handler with selected file', () => {
    const onFileSelect = jest.fn();
    const { container } = render(<CustomNewButton text="Upload" onFileSelect={onFileSelect} />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    Object.defineProperty(input, 'files', {
      value: [file],
    });
    fireEvent.change(input);
    expect(onFileSelect).toHaveBeenCalledWith(file);
  });

  test('clicks file input when button is clicked', () => {
    const { container } = render(<CustomNewButton text="Upload" />);
    const button = container.querySelector('button');
    const input = container.querySelector('input[type="file"]');
    const clickSpy = jest.spyOn(input, 'click');
    fireEvent.click(button);
    expect(clickSpy).toHaveBeenCalled();
  });
});
