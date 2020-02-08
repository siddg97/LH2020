import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

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
          <Message>
            New to us? <a>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login