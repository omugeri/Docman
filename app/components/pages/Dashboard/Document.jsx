import React, { PropTypes } from 'react';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import { connect } from 'react-redux';
import {
  IconMenu,
  MenuItem,
  IconButton,
  RaisedButton,
  Snackbar,
} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Edit from './Edit.jsx';
import Delete from './Delete.jsx';
import AppStyles from '../../../shared/styles/styles.css';
import * as displayActions from '../../../actions/displayActions';
import { errorSet } from '../../../actions/authActions';
import Pagination from './Pagination.jsx';

const docStyle = {
  width: '70%',
  marginTop: '2%',
  marginLeft: '10%',
  float: 'left',
};
const divStyle = {
  height: '350px',
  overflow: 'scroll',
}
const style = {
  textAlign: 'centre',
  marginLeft: '30%',
  marginTop: '2%',
  marginBottom: '3%',
};

class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      expanded: false,
      open: false,
      error: false,
      permissions: 'Public',
      toggle: false,
      edit: false,
      delete: false,
      toast: false,
    };
    this.handleId = this.handleId.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDialog = this.handleDialog.bind(this);
  }
  handleDialog = (doc) => {
    const id = doc._id;

    if (this.props.user === doc.owner) {
      this.setState({ toast: false });
      return this.setState({ delete: id });
    } else if (!this.props.user) {
      if (this.props.permissions === 'Admin') {
        return this.setState({ delete: id });
      }
    }
    this.props.errorSet('Cannot delete another user\'s document');
    this.setState({ toast: true });
  }
  handleDelClose = () => {
    this.setState({ delete: false });
  }
  handleDelete = (doc) => {
    this.props.deleteDoc(doc.id);
    this.setState({ toast: true });
  }
  handleExpand = () => {
    this.setState({ expanded: true });
  };
  handleEdit = (doc) => {
    const currentId = doc._id;
    if (this.props.user === doc.owner) {
      this.setState({ toast: false });
      return this.setState({
        edit: currentId,
        title: doc.title,
        content: doc.content,
      });
    }
    this.props.errorSet('Cannot edit another user\'s document');
    this.setState({ toast: true });
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
  handleContent = (event) => {
    this.setState({ content: event.target.value });
  }
  handleClose = () => {
    this.setState({ open: false });
  }
  handleEditDoc = (doc) => {
    this.setState({ edit: false });
    this.props.handleEditSubmit(doc);
    this.setState({ toast: true });
  }
  handleId = (id) => {
    this.setState({ id });
  }
  handleSubmit = () => {
    const newDoc = {
      title: this.state.title,
      content: this.state.content,
      permissions: this.state.permissions,
    };
    this.props.createDoc(newDoc);
    this.handleClose();
  }
  handleToggle = () => {
    this.setState({ permissions: 'Private' });
  };
  render() {
    if (!this.props.display) {
      return (<div></div>)
    }
    const docTable = this.props.display.map((doc) => {
      return (
        <div key={doc._id}>
          <Card
            style={docStyle}
            expanded={this.state.expanded}
            onExpandChange={this.handleExpandChange}
            className={AppStyles.doc}
          >
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{ horizontal: 'left', vertical: 'top'}}
              targetOrigin={{ horizontal: 'left', vertical: 'top'}}
              iconStyle={{ float: 'right' }}
            >
              <MenuItem primaryText="Edit"
                value={doc._id}
                onTouchTap={() => { this.handleEdit(doc); }} />
              <MenuItem primaryText="Delete"
                value={doc._id}
                onTouchTap={() => { this.handleDialog(doc); }}
              />
            </IconMenu>
            <CardTitle
              title={doc.title}
              subtitle={doc.owner}
              style={{ float:'right' }}
            />
            <CardText
              expandable={false}
            >
              {doc.content}
            </CardText>
          </Card>
          <div>
            <Edit
              open={this.state.edit === doc._id}
              handleToggle={this.handleToggle}
              handleClose={this.handleCloseEdit}
              handleSubmit={() => {
                const doc = {
                  id: this.state.edit,
                  title: this.state.title,
                  content: this.state.content,
                  permissions: this.state.permissions,
                };
                this.handleEditDoc(doc); }}
              handleContent={this.handleContent}
              handleTitle={this.handleTitle}
              doc={doc._id}
              defaultTitle={doc.title}
              defaultContent={doc.content}
              title={this.state.title}
              content={this.state.content}
            />
          </div>
          <div>
            <Delete
              open={this.state.delete === doc._id}
              handleClose={this.handleDelClose}
              handleDelete={this.handleDelete}
              title={doc.title}
              id={doc._id}
              owner={doc.owner}
            />
          </div>
        </div>
    );
    });
    return (
      <div>
        <div>
          <RaisedButton
            label='Add Document'
            secondary={true}
            style={style}
            onTouchTap={this.handleOpen}
          />
        </div>
        <div >
          <Edit
            open={this.state.open}
            handleToggle={this.handleToggle}
            handleClose={this.handleClose}
            handleSubmit={this.handleSubmit}
            handleContent={this.handleContent}
            handleTitle={this.handleTitle}
            title={this.state.title}
            content={this.state.content}
          />
        </div>
        <div style={divStyle} className={AppStyles.docdiv}>
          {docTable}
        </div>
        <Pagination onDocumentChange={this.props.reload} />
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
    dashboard: state.menu.dashboard,
    users: state.menu.users,
    documents: state.menu.documents,
    roles: state.menu.roles,
    userInfo: state.display.users,
    roleInfo: state.display.roles,
    docInfo: state.display.docs,
    page: state.display.page,
    dashboardInfo: state.display.dashboard,
    error: state.auth.error,
    user: window.localStorage.getItem('username'),
    permissions: window.localStorage.getItem('permissions'),
  };
}
const docActions = Object.assign({}, displayActions, { errorSet });
export default connect(mapStateToProps, docActions)(Document);

Document.propTypes = {
  handleEditSubmit: PropTypes.func,
  deleteDoc: PropTypes.func,
  createDoc: PropTypes.func,
};
