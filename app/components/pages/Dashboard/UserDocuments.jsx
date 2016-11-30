import React, { PropTypes } from 'react';
import { Dialog, FlatButton } from 'material-ui';
import { Card, CardText, CardTitle, CardActions } from 'material-ui/Card';
import { connect } from 'react-redux';
import * as displayActions from '../../../actions/displayActions';
import { openUserDoc } from '../../../actions/menuActions';


const style = {
  float: 'left',
  marginLeft: '10%',
  marginTop: '2%',
};

class UserDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose = () => {
    this.props.openUserDoc(false);
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary
        onTouchTap={this.handleClose}
      />,
    ];
    const docTable = this.props.display.userDocs.map((doc) => {
      return (
        <div key={doc._id} >
          <Card>
            <CardTitle
              title={doc.title}
              subtitle={doc.owner}
            />
            <CardText
              expandable={false}
              style={{ textColor: '#000' }}
            >
              {doc.content}
            </CardText>
          </Card>
        </div>
    );
    });
    return (
      <div>
        <Dialog
          actions={actions}
          title="Users Documents"
          open={this.props.userDocOpen}
          onRequestClose={this.handleClose}
          modal={false}
          autoScrollBodyContent={true}
        >
          <div>
            {docTable}
          </div>
        </Dialog>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userDocOpen: state.menu.userDocOpen,
    page: state.display.page,
  };
}
export default connect(mapStateToProps, { displayActions, openUserDoc })(UserDocuments);

UserDocuments.propTypes = {
  userDocOpen: PropTypes.func,
  openUserDoc: PropTypes.func,
  display: PropTypes.func,
};
