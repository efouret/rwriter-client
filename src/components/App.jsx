import React from 'react';

export default React.createClass({
  render: function() {
    return (
        <div>
            <h1>This is RWriter!</h1>
            {this.props.children}
        </div>
    );
  }
});
