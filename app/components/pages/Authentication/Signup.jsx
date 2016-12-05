import React from 'react';
import Dialog from 'material-ui/Dialog';
import {
  FlatButton,
  TextField,
  Snackbar,
  DropDownMenu,
  MenuItem } from 'material-ui';
import request from 'superagent';
import { connect } from 'react-redux';
import { create } from '../../../actions/authActions';
import * as displayActions from '../../../actions/displayActions';

const Dstyle = {
  height: '100%',
  maxHeight: 'none',
  width: '40%',
  maxWidth: 'none',
  borderRadius: '10px',
};

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      email: '',
      username: '',
      password: '',
      error: '',
      toast: false,
      assignedRole: 'User',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFirst = this.handleFirst.bind(this);
    this.handleLast = this.handleLast.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    request
      .get('/api/roles/')
      .set({ 'x-access-token': token })
      .query({
        limit: 3,
        page: 1,
      })
      .accept('json')
      .then((res) => {
        const roles = res.body;
        this.props.displayRoles(roles);
      });
  }
  handleChange = (event, index, value) => {
    this.setState({ assignedRole: value });
  }
  handleFirst = (event) => {
    this.setState({ first: event.target.value });
  }
  handleLast = (event) => {
    this.setState({ last: event.target.value });
  }
  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  }
  handleUsername = (event) => {
    this.setState({ username: event.target.value });
  }
  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  }
  handleSubmit = () => {
    const user = {
      firstName: this.state.first,
      lastName: this.state.last,
      userName: this.state.username,
      email: this.state.email,
      password: this.state.password,
      role: this.state.assignedRole,
    };
    console.log('role is: ', user.role);
    this.props.create(user);
    this.props.handleClose;
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.props.handleClose}
      />,
      <FlatButton
        label="Register"
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
      <div >
        <Dialog
          title="New User" color="#9C27B0"
          actions={actions}
          modal={true}
          open={this.props.open}
          onRequestClose={this.handleClose}
          contentStyle={Dstyle}
        >
          <div>
            <form>
              <TextField
                floatingLabelText="First Name"
                value={this.first}
                onChange={this.handleFirst}
                style={{ width: '80%' }}
              /><br />
              <TextField
                floatingLabelText="Last Name"
                value={this.last}
                onChange={this.handleLast}
                style={{ width: '80%' }}
              /><br />
              <TextField
                errorText={this.props.error}
                type="email"
                floatingLabelText="Email"
                value={this.email}
                onChange={this.handleEmail}
                style={{ width: '80%' }}
              /><br />
              <TextField
                floatingLabelText="UserName"
                value={this.username}
                onChange={this.handleUsername}
                style={{ width: '80%' }}
              /><br />
              <br />
              <TextField
                type="password"
                floatingLabelText="password"
                value={this.password}
                onChange={this.handlePassword}
                style={{ width: '80%' }}
              />
              <br />

              { this.props.rolesInfo !== undefined ?
                <DropDownMenu value={this.state.assignedRole} onChange={this.handleChange}>
                  {this.props.rolesInfo.map((role) => (
                    <MenuItem value={role.title} primaryText={role.title} />
                  ))}
                </DropDownMenu> : true }
            </form>
          </div>
          <Snackbar
            open={this.state.toast}
            message={this.props.error}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </Dialog>
      </div>
       );
  }
}
function mapStateToProps(state) {
  return {
    error: state.auth.error,
    rolesInfo: state.display.roles,
  };
}
export default connect(
  mapStateToProps,
  Object.assign({}, { create }, displayActions)
)(Signup);
