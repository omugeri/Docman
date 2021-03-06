import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Paper, Menu, MenuItem } from 'material-ui';
import Usersicon from 'material-ui/svg-icons/action/supervisor-account.js';
import Documentsicon from 'material-ui/svg-icons/action/assignment.js';
import Rolesicon from 'material-ui/svg-icons/communication/vpn-key.js';
import request from 'superagent';
import AppStyles from '../../../shared/styles/styles.css';
import * as menuActions from '../../../actions/menuActions';
import * as displayActions from '../../../actions/displayActions';
import User from './User.jsx';
import Documents from './Document.jsx';
import Roles from './Roles.jsx';

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    marginLeft: '0',
  },
  paperAlternate: {
    float: 'left',
    marginLeft: '0',
    width: '100%'
  },
  mobile: {
    display: 'none',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
  leftIcon: {
    color: '#ffffff',
  },
  item: {
    height: '25%',
    padding: '10%',
    color: '#fff',
  },
  itemAlternate: {
    marginLeft: ' 15%',
    marginBottom: '30%',
    float: 'left',
    width: '18%',
    color: '#fff',
    display: 'flex',
  },
};

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.onUserChange = this.onUserChange.bind(this);
    this.onDocumentChange = this.onDocumentChange.bind(this);
    this.onRolesChange = this.onRolesChange.bind(this);
  }
  onUserChange = () => {
    const token = window.localStorage.getItem('token').replace(/"/g, '');

    request
      .get('/api/users/')
      .set({ 'x-access-token': token })
      .accept('json')
      .end((err, res) => {
        const user = JSON.parse(res.text);
        if (res.status === 401) {
          browserHistory.push('/');
        }
        this.props.displayUsers(user);

        const users = true;

        this.props.openUsers(users);
      });
  }
  onDocumentChange = () => {
    this.props.reloadPage(this.props.page);
  }
  onRolesChange = () => {
    this.props.reloadRoles(this.props.page);
  }
  render() {
    return (
      <div>
        <Paper>
          <Menu style={style.paper} className={AppStyles.menu}>
            <MenuItem className={AppStyles.menu}
              primaryText="Users"
              leftIcon={<Usersicon />}
              onClick={this.onUserChange}
              style={style.item}
            />
            <MenuItem
              primaryText="Documents"
              leftIcon={<Documentsicon />}
              onClick={this.onDocumentChange}
              style={style.item}
            />
            {this.props.permissions === 'Admin' && (
              <MenuItem
                primaryText="Roles"
                leftIcon={<Rolesicon />}
                onClick={this.onRolesChange}
                style={style.item}
              />
            )}
          </Menu>
          </Paper>
          <Paper style={style.paperAlternate} className={AppStyles.alternateMenu}>
            <Menu >
              <MenuItem
                leftIcon={<Usersicon />}
                onClick={this.onUserChange}
                style={style.itemAlternate}
              />
              <MenuItem
                leftIcon={<Documentsicon />}
                onClick={this.onDocumentChange}
                style={style.itemAlternate}
              />
              {this.props.permissions === 'Admin' && (
                <MenuItem
                  leftIcon={<Rolesicon />}
                  onClick={this.onRolesChange}
                  style={style.itemAlternate}
                />
              )}
            </Menu>
        </Paper>
        { this.props.documents ? <Documents
          display={this.props.docInfo}
          reload={this.onDocumentChange}
        /> : true}
        { this.props.users ? <User display={this.props.userInfo} /> : true }
        { this.props.roles ? <Roles
          display={this.props.roles}
          reload={this.onRolesChange}
        /> : true}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dashboard: state.menu.dashboard,
    users: state.menu.users,
    documents: state.menu.documents,
    roles: state.menu.roles,
    userInfo: state.display.users,
    roleInfo: state.display.roles,
    docInfo: state.display.docs,
    page: state.display.page,
    dashboardInfo: state.display.dashboard,
    permissions: window.localStorage.getItem('permissions'),
  };
}
export default connect(
  mapStateToProps,
  Object.assign({}, displayActions, menuActions)
)(SideMenu);

SideMenu.propTypes = {
  permissions: PropTypes.string,
  users: PropTypes.bool,
  page: PropTypes.number,
  documents: PropTypes.bool,
  userInfo: PropTypes.array,
  docInfo: PropTypes.array,
  dashboardInfo: PropTypes.object,
  openRoles: PropTypes.func,
  openUsers: PropTypes.func,
  openDashboard: PropTypes.func,
  openDocuments: PropTypes.func,
  displayDocs: PropTypes.func,
  displayRoles: PropTypes.func,
  displayUsers: PropTypes.func,
  reloadPage: PropTypes.func,
  reloadRoles: PropTypes.func,
};
