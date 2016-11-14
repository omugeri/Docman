import React from 'react';
import { connect } from 'react-redux';
import { Paper, Menu, MenuItem } from 'material-ui';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import Dashboardicon from 'material-ui/svg-icons/action/dashboard.js';
import Usersicon from 'material-ui/svg-icons/action/supervisor-account.js';
import Documentsicon from 'material-ui/svg-icons/action/assignment.js';
import Rolesicon from 'material-ui/svg-icons/action/lock-open.js';
import request from 'superagent';
import configureStore from '../../../store/configureStore';
import styles from '../../../shared/styles/styles.css';
import { openUsers, openRoles, openDocuments } from '../../../actions/menuActions';
import { displayUsers, displayDocs, displayRoles } from '../../../actions/displayActions';
import Info from './Info.jsx';
import Display from './User.jsx';
import Documents from './Document.jsx';

const store = configureStore();

const docManTheme = getMuiTheme({
  palette: {
    primary1Color: '#9C27B0',
    primary2Color: '#7B1FA2',
    primary3Color: '#B66CF8',
    accent1Color: '#4CAF50',
    accent2Color: '#8BC34A',
    textColor: '#fff',
    secondaryTextColor: '#757575',
    canvasColor: '#9c27b0',
    borderColor: '#BDBDBD',
  },
});
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
    // backgroundColor: '#9C27B0',
    // opacity: '0.69'
  },
};

class SideMenu extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.state.documents = store.getState().display.docs;
    // this.state.dashboard = store.getState().display.dashboard;
    // this.state.users = store.getState().display.users;
    // this.state.roles = store.getState().display.roles;

    this.onDashboardChange = this.onDashboardChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onDocumentChange = this.onDocumentChange.bind(this);
    this.onRoleChange = this.onRoleChange.bind(this);
  }
  onDashboardChange = () => {
    this.setState ({
      dashboard: true,
      user: false,
      documents: false,
      roles: false,
    });
  }
  onUserChange = () => {
    console.log('Token is: ', store.getState());
    request
      .get('/api/users/')
      .set({ 'x-access-token': token })
      .accept('json')
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        const user = JSON.parse(res.text);
        store.dispatch(
          displayUsers(user)
        );
        this.state = Object.assign({}, {
          user: true,
          dashboard: false,
          documents: false,
          roles: false,
        });
      });
  }
  onDocumentChange = () => {
    const token = store.getState().auth.token;
    console.log(token);
    request
      .get('/api/documents/')
      .set({ 'x-access-token': token })
      .query({
        limit: 4,
      })
      .accept('json')
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        const documents = JSON.parse(res.text);
        console.log('DOCS NI: ', documents);
        store.dispatch(
          displayDocs(documents)
        );
        store.dispatch(openDocuments({
          dashboard: false,
          users: false,
          documents: true,
          roles: false,
        }));
      });
  }
  onRoleChange = () => {
    request
      .get('/api/roles/')
      .set({ 'x-access-token': token })
      .accept('json')
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        const roles = JSON.parse(res.text);
        store.dispatch(
          displayRoles(roles)
        );
        this.state = Object.assign({}, {
          dashboard: false,
          users: false,
          documents: false,
          roles: true,
        });
      });
  }
  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme(docManTheme)}>
          <Menu style={style.paper} >
            <MenuItem
              primaryText="Dashboard"
              leftIcon={<Dashboardicon className="styles.material-icons.md-light"/>}
              onClick={this.onDashboardChange}
              style={style.item}
            />
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
            <MenuItem
              primaryText="Roles"
              leftIcon={<Rolesicon />}
              onClick={this.onRoleChange}
              style={style.item}
            />
          </Menu>
        </MuiThemeProvider>
        { this.state.docs ? <Documents display={store.getState().display.docs} /> : true}
        { this.state.dashboard ? <Info /> : true }
        { this.state.user ? <Display display={store.getState().display.users} /> : true }
        {/*{ this.state.roles ? <Roles display={store.getState().display.roles} /> : true }*/}
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    dashboard: state.menu.dashboard,
    users: state.menu.users,
    documents: state.menu.documents,
    roles: state.menu.roles,
  };
}
export default connect(mapStateToProps)(SideMenu);
