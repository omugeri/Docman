import React from 'react';
import {Card, CardTitle, CardHeader, CardActions, CardText} from 'material-ui/Card';
import {MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import {Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


const div2 = {
  width: '77%',
  float: 'right',
  'margin-top': '2%',
  'margin-right': '5%'
}
const docManTheme = getMuiTheme({
  palette: {
    primary1Color: '#9C27B0',
    primary2Color: '#7B1FA2',
    primary3Color: '#B66CF8',
    accent1Color: '#4CAF50',
    accent2Color: '#8BC34A',
    textColor: '#fff',
    secondaryTextColor: '#757575',
    canvasColor: '#9c27b0',
    borderColor: '#BDBDBD'
  }
});
export default class Display extends React.Component{
  render(){
    return (
      <div>
      <MuiThemeProvider >
        <Card style={div2}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>

        </Card>
      </MuiThemeProvider>
      </div>
    )
  }
};
