import React from 'react';
import Dialog from 'material-ui/Dialog';
import { FlatButton, TextField } from 'material-ui';
import { connect } from 'react-redux';

const Dstyle = {
  height: '100%',
  maxWidth: '380.5px',
  borderRadius: '10px',
};

export class Login extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.props.handleClose}
      />,
      <FlatButton
        label="Submit"
        onTouchTap={this.props.handleSubmit}
      />,
    ];
    return (
      <div >
        <Dialog
          title="Login" color='#9C27B0'
          actions={actions}
          modal={true}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
          contentStyle={Dstyle}
        >
          <div>
            <form>
              <TextField
                errorText={this.props.error}
                floatingLabelText="UserName"
                name="username"
                value={this.props.username}
                onChange={this.props.handleUsername}
                fullWidth={true}
              /><br />
              <br />
              <TextField
                errorText={this.props.error}
                type='password'
                floatingLabelText="password"
                name='password'
                value={this.props.password}
                onChange={this.props.handlePassword}
                fullWidth={true}
              />
              <br />
            </form>
          </div>
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
export default connect(mapStateToProps)(Login);
