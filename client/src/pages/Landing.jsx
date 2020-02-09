import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      email:'',
      password:'',
      err:{},
    }
  }

  handleChange = (e, {name,value}) => this.setState({ [name]:value })
  handleLogin = () => console.log(this.state)

  render(){
    const { email, password, err } = this.state;
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Log-in to your account
          </Header>
          <Form size='large'>
            <Segment>
              <Form.Input 
                fluid 
                name='email' 
                value={email} 
                icon='user' 
                iconPosition='left' 
                placeholder='E-mail address'
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                name='password'
                value={password}
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={this.handleChange}
              />
              <Button color='teal' fluid size='large' onClick={this.handleLogin}>
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

class Register extends React.Component {
  constructor(){
    super();
    this.state = {
      name:'',
      email:'',
      password:'',
      password2:'',
      err:{},
    }
  }

  handleChange = (e, {name,value}) => this.setState({ [name]:value })
  handleSignup = () => console.log(this.state)

  render(){
    const { name, email, password, password2 ,err } = this.state;
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Create your account
          </Header>
          <Form size='large'>
            <Segment>
              <Form.Input 
                fluid 
                name='name' 
                value={name} 
                icon='user' 
                iconPosition='left' 
                placeholder='Full name'
                onChange={this.handleChange}
              />
              <Form.Input 
                fluid 
                name='email' 
                value={email} 
                icon='mail' 
                iconPosition='left' 
                placeholder='E-mail address'
                onChange={this.handleChange}
              />
              <Form.Input
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
                fluid
                name='password2'
                value={password2}
                icon='lock'
                iconPosition='left'
                placeholder='Confirm password'
                type='password'
                onChange={this.handleChange}
              />
              <Button color='teal' fluid size='large' onClick={this.handleSignup}>
                Register
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

class Landing extends React.Component {
  state = { login: true };
  render(){
    return (
      <div>
        <Button color='red' onClick={() => this.setState({login: !this.state.login})} content={this.state.login ? 'Register' : 'Login'}/>
      {
        this.state.login ? <Login/> : <Register/>
      }
      </div>
    )
  }
}

export default Landing