import React from 'react';
import { Card } from 'material-ui/Card';
import { MuiThemeProvider } from 'material-ui/styles';
import { Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const div2 = {
  width: '77%',
  float: 'right',
  marginTop: '2%',
  marginRight: '5%',
};

export default class Display extends React.Component {
  render() {
    console.log('KWA DISPLAY: ', this.props);
    const userTable = this.props.display.map((user) => {
      return (<TableRow key={user._id}>
        <TableRowColumn>{user.name.first}</TableRowColumn>
        <TableRowColumn>{user.name.last}</TableRowColumn>
        <TableRowColumn>{user.role}</TableRowColumn>
      </TableRow>);
    });
    return (
      <div>
          <Card style={div2}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>First Name</TableHeaderColumn>
                  <TableHeaderColumn>Second Name</TableHeaderColumn>
                  <TableHeaderColumn>Status</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userTable}
              </TableBody>
            </Table>
          </Card>
      </div>
    );
  }
}
