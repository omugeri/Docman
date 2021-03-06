import React from 'react';
import Dialog from 'material-ui/Dialog';
import { FlatButton, TextField } from 'material-ui';

const editStyle = {
  textAlign: 'center',
  fontFamily: 'Bree Serif',
};

export default class EditRole extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.handleSubmit}
      />,
    ];
    return (
      <div >
        <Dialog
          title="New Role"
          actions={actions}
          modal={true}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
          contentStyle={editStyle}
        >
          <div>
            <form>
              <TextField
                floatingLabelText="Title"
                name="title"
                defaultValue={this.props.defaultTitle}
                onChange={this.props.handleTitle}
                style={{ width: '80%' }}
              />
              <br />
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}
