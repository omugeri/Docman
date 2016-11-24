import React, { PropTypes } from 'react';
import { Card, CardText, CardTitle, CardActions } from 'material-ui/Card';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {
  FloatingActionButton,
  IconMenu,
  MenuItem,
  IconButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Edit from './Edit.jsx';
import Delete from './Delete.jsx';
import * as displayActions from '../../../actions/displayActions';
import Pagination from './Pagination.jsx';

const docStyle = {
  width: '60%',
  // float: 'left',
  marginTop: '2%',
  marginLeft: '30%',
};
const style = {
  float: 'left',
  marginLeft: '10%',
  marginTop: '2%',
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
  handleDialog = (id) => {
    this.setState({ delete: id });
  }
  handleDelClose = () => {
    this.setState({ delete: false });
  }
  handleDelete = (doc) => {
    this.props.deleteDoc(doc);
  }
  handleExpand = () => {
    this.setState({ expanded: true });
  };
  handleEdit = (doc) => {
    const currentId = doc._id;
    this.setState({
      edit: currentId,
      title: doc.title,
      content: doc.content,
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
  handleContent = (event) => {
    this.setState({ content: event.target.value });
  }
  handleClose = () => {
    this.setState({ open: false });
  }
  handleEditSubmit = (doc) => {
    this.setState({ edit: false });
    this.props.handleEditSubmit(doc);
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
    const docTable = this.props.display.map((doc) => {
      return (
        <div key={doc._id}>
          <Card
            style={docStyle}
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
              value={doc._id}
              onTouchTap={() => { this.handleEdit(doc); }} />
              <MenuItem primaryText="Delete"
              value={doc._id}
              onTouchTap={() => { this.handleDialog(doc._id); }}
              />
            </IconMenu>
            <CardTitle
              title={doc.title}
              subtitle={doc.owner}
              style={{float:'right'}}
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
              this.handleEditSubmit(doc); }}
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
          handleContent={this.handleContent}
          handleTitle={this.handleTitle}
          title={this.state.title}
          content={this.state.content}
        />
        </div>
        <div>
          {docTable}
        </div>
        <Pagination onDocumentChange={this.props.reload} />
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
export default connect(mapStateToProps, displayActions)(Document);

Document.propTypes = {
  page: PropTypes.number,
  handleEditSubmit: PropTypes.func,
  deleteDoc: PropTypes.func,
  createDoc: PropTypes.func,
};
