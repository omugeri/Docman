import React, { PropTypes } from 'react';
import { Card, CardText, CardTitle, CardActions } from 'material-ui/Card';
import { connect } from 'react-redux';
import {
  RaisedButton,
  IconMenu,
  MenuItem,
  IconButton } from 'material-ui';
import Snackbar from 'material-ui/Snackbar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditRole from './EditRole.jsx';
import Delete from './Delete.jsx';
import * as displayActions from '../../../actions/displayActions';

const roleStyle = {
  width: '60%',
  marginTop: '1%',
  marginLeft: '30%',
};
const style = {
  textAlign: 'centre',
  marginLeft: '30%',
  marginTop: '2%',
};

class Roles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      open: false,
      error: false,
      toast: false,
      edit: false,
      delete: false,
    };
    this.handleId = this.handleId.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDialog = this.handleDialog.bind(this);
  }
  handleDialog = (id) => {
    this.setState({ delete: id });
  }
  handleDelClose = () => {
    this.setState({ delete: false });
  }
  handleDelete = (role) => {
    this.setState({ toast: false });
    this.props.deleteRole(role.id);
    this.setState({ toast: true });
  }
  handleEdit = (role) => {
    const currentId = role._id;
    this.setState({
      edit: currentId,
      title: role.title,
      content: role.content,
    });
  }
  handleCloseEdit = () => {
    this.setState({ edit: false });
  }
  handleOpen = () => {
    this.setState({ open: true });
  }
  handleTitle = (event) => {
    this.setState({ title: event.target.value });
  }
  handleClose = () => {
    this.setState({ open: false });
  }
  handleEditSubmit = (role) => {
    this.setState({ edit: false });
    this.setState({ toast: false });
    (this.props.handleEditRole(role)).then(
      this.setState({ toast: true })
    );
  }
  handleId = (id) => {
    this.setState({ id });
  }
  handleSubmit = () => {
    this.setState({ toast: false });
    const newRole = {
      title: this.state.title,
    };
    this.props.createRole(newRole);
    this.setState({ toast: true });
    this.handleClose();
  }
  render() {
    const roleTable = this.props.roleInfo.map((role) => {
      return (
        <div key={role._id}>
          <Card
            style={roleStyle}
            onExpandChange={this.handleExpandChange}
          >
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              iconStyle={{ float: 'right' }}
            >
              <MenuItem primaryText="Edit"
                value={role._id}
                onTouchTap={() => { this.handleEdit(role); }} />
              <MenuItem primaryText="Delete"
                value={role._id}
                onTouchTap={() => { this.handleDialog(role._id); }}
              />
            </IconMenu>
            <CardText
              expandable={false}
            >
              {role.title}
            </CardText>
          </Card>
          <div>
            <EditRole
              open={this.state.edit === role._id}
              handleToggle={this.handleToggle}
              handleClose={this.handleCloseEdit}
              handleSubmit={() => {
                const role = {
                  id: this.state.edit,
                  title: this.state.title,
                };
                this.handleEditSubmit(role); }}
              handleTitle={this.handleTitle}
              role={role._id}
              defaultTitle={role.title}
              title={this.state.title}
            />
          </div>
          <div>
            <Delete
              open={this.state.delete === role._id}
              handleClose={this.handleDelClose}
              handleDelete={this.handleDelete}
              title={role.title}
              id={role._id}
            />
          </div>
        </div>
    );
    });
    return (
      <div>
        <RaisedButton
          label='Add Label'
          secondary={true}
          style={style}
          onTouchTap={this.handleOpen}
        />
        <div>
          <EditRole
            open={this.state.open}
            handleToggle={this.handleToggle}
            handleClose={this.handleClose}
            handleSubmit={this.handleSubmit}
            handleTitle={this.handleTitle}
            title={this.state.title}
          />
        </div>
        <div>
          {roleTable}
        </div>
        <Snackbar
          open={this.state.toast}
          message={this.props.error}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    users: state.menu.users,
    rolesMenu: state.menu.roles,
    roleInfo: state.display.roles,
    page: state.display.page,
    error: state.auth.error,
  };
}
export default connect(mapStateToProps, displayActions)(Roles);
