import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Paper, Menu, MenuItem } from 'material-ui';
import Dashboardicon from 'material-ui/svg-icons/action/dashboard.js';
import Usersicon from 'material-ui/svg-icons/action/supervisor-account.js';
import Documentsicon from 'material-ui/svg-icons/action/assignment.js';
import request from 'superagent';
// import styles from '../../../shared/styles/styles.css';
import * as menuActions from '../../../actions/menuActions';
import * as displayActions from '../../../actions/displayActions';
import Info from './Info.jsx';
import User from './User.jsx';
import Documents from './Document.jsx';

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '0px 0px 50px 0',
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
};

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.onDashboardChange = this.onDashboardChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onDocumentChange = this.onDocumentChange.bind(this);
    this.onRoleChange = this.onRoleChange.bind(this);
  }
  onDashboardChange = () => {
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    const dashboard = {
      dashboard: false,
      users: false,
      documents: true,
      roles: false,
    };
    this.props.openDashboard(true);
  }
  onUserChange = () => {
    const token = window.localStorage.getItem('token').replace(/"/g, '');

    request
      .get('/api/users/')
      .set({ 'x-access-token': token })
      .accept('json')
      .end((err, res) => {
        const user = JSON.parse(res.text);
        if (res.status === 401){
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
  onRoleChange = () => {
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    request
      .get('/api/roles/')
      .set({ 'x-access-token': token })
      .accept('json')
      .end((res) => {
        const roles = JSON.parse(res.text);
        this.props.displayRoles(roles);
        const roleMenu = {
          dashboard: false,
          users: false,
          documents: false,
          roles: true,
        };
        this.props.openRoles(roleMenu);
      });
  }
  render() {
    return (
      <div>
        <Paper>
          <Menu style={style.paper} >
            {/*<MenuItem
              primaryText="Dashboard"
              leftIcon={<Dashboardicon className="styles.material-icons.md-light" />}
              onClick={this.onDashboardChange}
              style={style.item}
            />*/}
            <MenuItem
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
          </Menu>
        </Paper>
        { this.props.documents ? <Documents
          display={this.props.docInfo}
          reload={this.onDocumentChange}
        /> : true}
        { this.props.dashboard ? <Info display={this.props.dashboardInfo} /> : true }
        { this.props.users ? <User display={this.props.userInfo} /> : true }
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
  };
}
export default connect(
  mapStateToProps,
  Object.assign({}, displayActions, menuActions)
)(SideMenu);

SideMenu.propTypes = {
  dashboard: PropTypes.bool,
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
};
