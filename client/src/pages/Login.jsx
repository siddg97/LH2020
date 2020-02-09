import React from 'react';
import axios from 'axios';
import { Form, Header, Message, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      email:'',
      password:'',
      err:'',
    }
  }

  handleChange = (e, {name,value}) => this.setState({ [name]:value })
  
  handleLogin = () => {
    const { email, password } = this.state;
    axios.post('http://localhost:5000/login', { email, password })
      .then( resp => {
        if(resp.data.isValid){
          this.props.history.push('/dash');
        } else {
          this.setState({ err: resp.data.msg });
        }
      })
      .catch(err => console.error(err))
  }

  render(){
    const { email, password, err } = this.state;
    return (
      <Segment 
        inverted
        textAlign='center'
      >
        <Header as='h2' color='green' textAlign='center'>
          Log-in to your account
        </Header>
        <center>
        <Form size='large'>
            <Form.Input 
              width={8}
              fluid 
              name='email' 
              value={email} 
              icon='user' 
              iconPosition='left' 
              placeholder='E-mail address'
              onChange={this.handleChange}
            />
            <Form.Input
              width={8}
              fluid
              name='password'
              value={password}
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={this.handleChange}
            />
            <Form.Button 
              width={8}
              color='green' 
              fluid 
              size='large' 
              onClick={this.handleLogin}
            >
              Login
            </Form.Button>
        </Form>
        </center>
        {
          err!=='' ? <Message>{err}</Message> : ''
        }
      </Segment>
    )
  }
}

export default withRouter(Login);