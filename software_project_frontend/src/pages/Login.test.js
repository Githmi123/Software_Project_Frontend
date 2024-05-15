// jest.mock('../../images/logo.png', () => '../../__mocks__/logo.png.js');


import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';
import {LeftPane} from '../components/LeftPane/LeftPane';
import { RightPane } from '../components/RightPane/RightPane';

describe('Login component', () => {
  it('LeftPane should render without crashing', () => {
    render(<LeftPane />);
  });

});
