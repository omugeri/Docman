import React, { PropTypes } from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { connect } from 'react-redux';
import { reloadPage } from '../../../actions/displayActions';

const paperStyle = {
  backgroundColor: '#ffff',
  width: '70%',
  marginTop: '5%',
  marginLeft: '20%',
};

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  previous = () => {
    if (this.props.page > 1) {
      const page = this.props.page - 1;
      this.props.reloadPage(page);
    }
  }

  next = () => {
    if (this.props.page < this.props.pages) {
      if (this.props.page < 1) {
        const page = this.props.page + 2;
        this.props.reloadPage(page);
      } else {
        const page = this.props.page + 1;
        this.props.reloadPage(page);
      }
      this.props.onDocumentChange;
    }
  }
  render() {
    const { page } = this.props;
    const { pages } = this.props;
    return page && (
      <BottomNavigation
        style={paperStyle}
      >
        { page > 1 ? <BottomNavigationItem
          label="Previous"
          icon={<NavigationArrowBack />}
          onTouchTap={this.previous}
        /> : <span>Page 1 of {pages}</span> }
        { page !== pages ? <BottomNavigationItem
          label="Next"
          icon={<NavigationArrowForward />}
          onTouchTap={this.next}
        /> : <span>Page {pages} of {pages}</span> }
      </BottomNavigation>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.display.page,
    pages: state.display.pages,
  };
}

export default connect(mapStateToProps, { reloadPage })(Pagination);

Pagination.propTypes = {
  page: PropTypes.number,
  pages: PropTypes.number,
  reloadPage: PropTypes.func,
  onDocumentChange: PropTypes.func,
};
