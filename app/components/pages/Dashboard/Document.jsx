import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { Card } from 'material-ui/Card';
import { Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const div2 = {
  width: '77%',
  float: 'right',
  marginTop: '2%',
  marginRight: '5%',
};

export default class Document extends React.Component {
  render() {
    const docTable = this.props.display.map((doc) => {
      return (<TableRow>
        <TableRowColumn>{doc._id}</TableRowColumn>
        <TableRowColumn>{doc.Title}</TableRowColumn>
        <TableRowColumn>{doc.Content}</TableRowColumn>
      </TableRow>);
    });
    return (
      <div>
        <MuiThemeProvider >
          <Card style={div2}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Title</TableHeaderColumn>
                  <TableHeaderColumn>Content</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {docTable}
              </TableBody>
            </Table>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}
