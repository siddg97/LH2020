import React from 'react';
import { Form, Header, Message, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Register extends React.Component {
  constructor(){
    super();
    this.state = {
      name:'',
      email:'',
      password:'',
      password2:'',
      err:'',
    }
  }

  handleChange = (e, {name,value}) => this.setState({ [name]:value })
  
  handleSignup = () => {
    const { name, email, password, password2 } = this.state;
    axios.post('http://localhost:5000/register', { name, email, password, password2 })
      .then(resp => {
        if(resp.data.isValid){
          this.props.history.push('/dash')
        } else {
          this.setState({ err: resp.data.msg })
        }
      })
      .catch(err => console.error(err));
  }

  render(){
    const { name, email, password, password2 ,err } = this.state;
    return (
      <Segment 
        inverted
        textAlign='center'
      >
        <Header as='h2' color='red' textAlign='center'>
          Register for a new account
        </Header>
        <center>
        <Form size='large' >
            <Form.Input
              width={8}
              fluid 
              name='name' 
              value={name} 
              icon='user' 
              iconPosition='left' 
              placeholder='Full name'
              onChange={this.handleChange}
            />
            <Form.Input
              width={8}
              fluid 
              name='email' 
              value={email} 
              icon='mail' 
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
            <Form.Input
              width={8}
              fluid
              name='password2'
              value={password2}
              icon='lock'
              iconPosition='left'
              placeholder='Confirm password'
              type='password'
              onChange={this.handleChange}
            />
            <Form.Button 
              width={8}
              color='red' 
              fluid 
              size='large' 
              onClick={this.handleSignup}
            >
              Register
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

export default withRouter(Register);