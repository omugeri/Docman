import React from 'react';
import Dialog from 'material-ui/Dialog';
import { FlatButton, TextField, Snackbar } from 'material-ui';
import { connect } from 'react-redux';
import { create } from '../../../actions/authActions';

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
    };
    this.handleFirst = this.handleFirst.bind(this);
    this.handleLast = this.handleLast.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    };
    this.props.create(user);
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
                name="first"
                value={this.first}
                onChange={this.handleFirst}
                style={{ width: '80%' }}
              /><br />
              <TextField
                floatingLabelText="Last Name"
                name="last"
                value={this.last}
                onChange={this.handleLast}
                style={{ width: '80%' }}
              /><br />
              <TextField
                errorText={this.props.error}
                type="email"
                floatingLabelText="Email"
                name="email"
                value={this.email}
                onChange={this.handleEmail}
                style={{ width: '80%' }}
              /><br />
              <TextField
                floatingLabelText="UserName"
                name="username"
                value={this.username}
                onChange={this.handleUsername}
                style={{ width: '80%' }}
              /><br />
              <br />
              <TextField
                type="password"
                floatingLabelText="password"
                name="password"
                value={this.password}
                onChange={this.handlePassword}
                style={{ width: '80%' }}
              />
              <br />
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
  };
}
export default connect(mapStateToProps, { create })(Signup);
