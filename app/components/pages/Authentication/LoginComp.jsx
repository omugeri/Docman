import React from 'react';
import require from 'superagent';



const styles = {
  radioButton: {
    marginTop: 16,
  },
};

export default class LoginComp extends React.Component {
  
  handleSubmit = () => {
    request
      .post()
  }
  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            <TextField name='username'
              label htmlFor = 'Username'
            />
            <br/>
            <TextField name= 'password'
              type = 'password'
            />
          </form>
      </div>
    );
  }
}
