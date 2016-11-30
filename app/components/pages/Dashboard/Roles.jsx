import React, { PropTypes } from 'react';
import { Card, CardText, CardTitle, CardActions } from 'material-ui/Card';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {
  FloatingActionButton,
  IconMenu,
  MenuItem,
  IconButton } from 'material-ui';
import CircularProgress from 'material-ui/CircularProgress';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Edit from './Edit.jsx';
import Delete from './Delete.jsx';
import * as displayActions from '../../../actions/displayActions';
import Pagination from './Pagination.jsx';

const roleStyle = {
  width: '60%',
  // float: 'left',
  marginTop: '2%',
  marginLeft: '30%',
};
const style = {
  // float: 'left',
  marginLeft: '10%',
  marginTop: '2%',
};

class Roles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      expanded: false,
      open: false,
      error: false,
      permissions: 'Public',
      toggle: false,
      edit: false,
      delete: false,
    };
    this.handleId = this.handleId.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
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
    this.props.deleteDoc(role);
  }
  handleExpand = () => {
    this.setState({ expanded: true });
  };
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
    this.props.handleEditSubmit(role);
  }
  handleId = (id) => {
    this.setState({ id });
  }
  handleSubmit = () => {
    const newRole = {
      title: this.state.title,
    };
    this.props.createDoc(newRole);
    this.handleClose();
  }
  handleToggle = () => {
    this.setState({ permissions: 'Private' });
  };
  render() {
    while (!this.props.display){
      return (<div> <CircularProgress /> </div>)
    }
    const roleTable = this.props.display.map((role) => {
      return (
        <div key={role._id}>
          <Card
            style={roleStyle}
            expanded={this.state.expanded}
            onExpandChange={this.handleExpandChange}
          >
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              iconStyle={{float: 'right'}}
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
          <Edit
            open={this.state.edit === role._id}
            handleToggle={this.handleToggle}
            handleClose={this.handleCloseEdit}
            handleSubmit={() => {
              const role = {
                id: this.state.edit,
                title: this.state.title,
              };
              this.handleEditSubmit(role); }}
            handleContent={this.handleContent}
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
        <FloatingActionButton
          secondary={true}
          style={style}
          onTouchTap={this.handleOpen}
        >
          <ContentAdd />
        </FloatingActionButton>
        <div>
        <Edit
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
        <Pagination onRolesChange={this.props.reload} />
        </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    dashboard: state.menu.dashboard,
    users: state.menu.users,
    roleuments: state.menu.roleuments,
    roles: state.menu.roles,
    userInfo: state.display.users,
    roleInfo: state.display.roles,
    roleInfo: state.display.roles,
    page: state.display.page,
    dashboardInfo: state.display.dashboard,
  };
}
export default connect(mapStateToProps, displayActions)(Roles);

Roles.propTypes = {
  page: PropTypes.number,
  handleEditSubmit: PropTypes.func,
  deleteDoc: PropTypes.func,
  createDoc: PropTypes.func,
};
