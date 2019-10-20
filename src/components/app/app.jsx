
import * as React from 'react';
import './app.scss';
import TabBar from '../tab-bar/tab-bar';
import theme from '../../material-ui-theme';
import { ThemeProvider } from '@material-ui/core/styles';

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <TabBar/>
    </ThemeProvider>
  );
}