import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const FloatingButton = () => (
  <div>
    <FloatingActionButton
      secondary={true}
      style={style}
      onTouchTap={this.props.}
    >
      <ContentAdd />
    </FloatingActionButton>
  </div>
);
export default FloatingButton;
