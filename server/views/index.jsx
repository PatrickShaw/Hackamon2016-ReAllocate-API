import React from 'react';
import DefaultLayout from './layouts/default-layout';
import {List, ListItem} from 'material-ui/List';
import {Card, CardHeader, CardText} from 'material-ui/Card' ;
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

const Index = props => (
    <DefaultLayout>
        <Card style={{width: "100%"}}>
            <List>
                <Subheader>Example checkbox list</Subheader>
            </List>
            <Divider/>
            <div style={{padding: "8px"}}>
                <RaisedButton label="ADD ITEM"/>
                <RaisedButton label="Test"/>
            </div>
        </Card>
    </DefaultLayout>
);
export default Index;