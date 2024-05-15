import React from 'react';
import { render, screen } from '@testing-library/react';
import { LeftPane } from './LeftPane';

test('renders left pane with correct text', () => {
  render(<LeftPane />);
  
  const systemName = screen.getByText(/Automated Paper Grading System/i);
  expect(systemName).toBeInTheDocument();

  const facultyName = screen.getByText(/Faculty of Engineering/i);
  expect(facultyName).toBeInTheDocument();

  const universityName = screen.getByText(/University of Ruhuna/i);
  expect(universityName).toBeInTheDocument();
});
