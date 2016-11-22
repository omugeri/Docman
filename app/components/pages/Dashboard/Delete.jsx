import React from 'react';
import {Dialog, RaisedButton, FlatButton} from 'material-ui';

export default class Delete extends React.Component {
  render(){
    const actions = [
      <FlatButton
        label='Cancel'
        primary={true}
        onTouchTap={this.props.handleClose}
      />,
      <FlatButton
        label='Delete'
        primary={true}
        onTouchTap={() => { this.props.handleDelete(this.props.id); }}
        />
    ];
    return (
      <div>
      <Dialog
        open={this.props.open}
        actions={actions}
        modal={true}
      >
      Are you sure you want to delete {this.props.title} ?.
      </Dialog>
      </div>
    );
  }
}
