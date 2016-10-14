import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();
const Index = props => (
    <MuiThemeProvider>
        <div>
            <AppBar title="App name"/>
            {props.children}
        </div>
    </MuiThemeProvider>
);
export default Index;