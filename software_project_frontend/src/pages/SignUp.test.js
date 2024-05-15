import React from 'react';
import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import SignUp from './SignUp';
import {LeftPane} from '../components/LeftPane/LeftPane';
import { RightPaneSignUp } from '../components/RightPaneSignUp/RightPaneSignUp';


describe('SignUp', () => {
    it('LeftPane should render without crashing', () => {
        render(<LeftPane />);
      });

  });



