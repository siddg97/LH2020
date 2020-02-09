import React from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react'
import Login from './Login';
import Register from './Register';

class Landing extends React.Component {
  state = { login: true };
  render(){
    const segStyle = { minHeight:'100vh', padding:'25vh', borderRadius:0 };
    return (
      <Segment 
        inverted 
        textAlign='center' 
        style={segStyle}
      >
        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column>
          {
            this.state.login ? <Login/> : <Register/>
          }
          {
            this.state.login ? 'New user ?     ' : 'Already have an account ?     '
          }
          <Button 
            inverted 
            size='mini'
            color={this.state.login ? 'red' : 'green'} 
            onClick={() => this.setState({login: !this.state.login})} 
            content={this.state.login ? 'Register' : 'Login'}
          />
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

export default Landing;