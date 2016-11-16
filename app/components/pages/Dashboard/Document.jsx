import React, { PropTypes } from 'react';
import { Card, CardText, CardTitle, CardActions } from 'material-ui/Card';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { RaisedButton,
  FloatingActionButton,
  IconMenu,
  MenuItem,
  IconButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import request from 'superagent';
import Edit from './Edit.jsx';
import { reloadPage } from '../../../actions/displayActions';
import Pagination from './Pagination.jsx';

const docStyle = {
  width: '30%',
  float: 'left',
  marginTop: '2%',
  marginLeft: '5%',
};
const style = {
  float: 'right',
  marginRight: '2%',
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
    };
    this.handleTitle = this.handleTitle.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleExpand = () => {
    this.setState({ expanded: true });
  };
  handleEdit = () => {
    this.setState({ expanded: false });
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
  handleEdit = () => {
    const id = this.props.doc_id;
    this.props.editDoc(id);
  }
  handleSubmit = () => {
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    request
    .post('/api/documents')
    .set({ 'x-access-token': token })
    .send({
      title: this.state.title,
      content: this.state.content,
      permissions: this.state.permissions,
    })
      .end((err, res) => {
        if (res.status === 200) {
          this.props.reloadPage(this.props.page);
          this.handleClose();
          browserHistory.push('/dashboard');
        } else {
          this.setState({
            error: true,
          });
        }
      });
  }
  handleToggle = () => {
    this.setState({ permissions: 'Private' });

  };
  render() {
    const docTable = this.props.display.map((doc) => {
      const buttonActions = (doc) => {
        if (doc.permissions === 'Private') {
          return (
            <div>
              <CardActions>
                <RaisedButton
                  label="Read More"
                  onTouchTap={this.handleExpand}
                  secondary
                />
              </CardActions>
            </div>
          );
        }
        return (
          <CardActions>
            <RaisedButton
              label="Read More"
              onTouchTap={this.handleExpand}
              secondary
            />
          </CardActions>
        );
      };
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
              onTouchTap={this.handleEdit}/>
              <MenuItem primaryText="Delete"
              value={doc._id}
              onTouchTap={this.handleDelete}
              />
            </IconMenu>
            <CardTitle
              title={doc.title}
              subtitle={doc.owner}
              style={{float:'right'}}
            />
            <CardText
              expandable={true}
            >
              {doc.content}
            </CardText>
            {buttonActions(doc)}
          </Card>
        </div>
    );
    });
    return (
      <div>
      <div>
        <FloatingActionButton
          secondary={true}
          style={style}
          onTouchTap={this.handleOpen}
        >
          <ContentAdd />
        </FloatingActionButton>
        </div>
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
          handleEdit={this.handleEdit}
        />
        <div>
          {docTable}
        </div>
        <br />
        <Pagination onDocumentChange={this.props.reload}/>
        </div>
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
export default connect(mapStateToProps, { reloadPage })(Document);

Document.propTypes = {
  page: PropTypes.number,
  reloadPage: PropTypes.func,
};
