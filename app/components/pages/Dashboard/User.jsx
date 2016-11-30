import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, FloatingActionButton } from 'material-ui';
import { Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Signup from '../Authentication/Signup.jsx';
import { selectedUser } from '../../../actions/displayActions';
import Documents from './UserDocuments.jsx';


const div2 = {
  float: 'left',
  marginTop: '2%',
  marginLeft: '5%',
  height: '50%',
};
const style = {
  float: 'left',
  marginLeft: '5%',
  marginTop: '2%',
};
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      register: false,
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.handleRegisterClose = this.handleRegisterClose.bind(this);
  }
  handleRegister = () => {
    this.setState({ register: true });
  }
  handleRegisterClose = () => {
    this.setState({ register: false });
  }
  render() {
    const userTable = this.props.display.map((user) => {
      return (
        <TableRow key={user._id} >
          <TableRowColumn>{user.name.first + '  ' + user.name.last}</TableRowColumn>
          <TableRowColumn>{user.role}</TableRowColumn>
        </TableRow>);
    });
    return (
      <div>

        <FloatingActionButton
          secondary={true}
          style={style}
          onTouchTap={this.handleRegister}
        >
          <ContentAdd />
        </FloatingActionButton>
        <div style={{ width: '50%', float: 'left' }}>
          <Card style={div2}>
            <Table
              onRowSelection={(row) => {
                this.props.selectedUser(row);
              }}
            >
              <TableHeader>
                <TableRow >
                  <TableHeaderColumn>Full Name</TableHeaderColumn>
                  <TableHeaderColumn>Status</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody >
                {userTable}
              </TableBody>
            </Table>
          </Card>
        </div>
        <Signup
          open={this.state.register}
          handleClose={this.handleRegisterClose}
        />
        { this.props.userDocOpen ? <Documents
          display={this.props.docInfo}
        /> : true}
      </div>

    );
  }
}
function mapStateToProps(state) {
  return {
    docInfo: state.display,
    userDocOpen: state.menu.userDocOpen,
  };
}
export default connect(mapStateToProps, { selectedUser })(User);
User.propTypes = {
  userDocOpen: PropTypes.boolean,
  selectedUser: PropTypes.func,
  display: PropTypes.array,
};
