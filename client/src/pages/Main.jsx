import React from 'react'
import { Button, Form, Grid, Header, Segment, Icon, Container, Divider, GridColumn } from 'semantic-ui-react'

class MainForm extends React.Component {
  constructor(){
    super();
    this.state = {
      URL:'',
    }
  }

  handleChange = (e, {URL,value}) => this.setState({ [URL]:value })
  handleLogin = () => console.log(this.state)

  render(){
    const { URL } = this.state;
    return (
      <Grid celled style={{minHeight:'100vh'}}  verticalAlign='middle'>
          
        <Grid.Column verticalAlign='left' width={8}>
          <Header as='h2' color='teal' textAlign='center'> Dashboard </Header>

          <Form size='large'>
            <Segment>
              <Form.Input 
                fluid 
                name='URL' 
                value={URL} 
                placeholder='Paste URL Link Here'
                onChange={this.handleChange}
              />

              <Button color='green' fluid size='large' onClick={this.handleLogin}>
                Submit URL link
              </Button>

              <Segment placeholder>
                <Header icon>
                <Icon name='pdf file outline' />
                PDF file to be placed in here.
                </Header>
                <Button primary>Submit PDF file</Button>
              </Segment>

              <Form.TextArea label='Text Article' placeholder='Place the text extract that you want to convert to Simple English' />

              <Button color='blue' fluid size='large' onClick={this.handleLogin}>
                Submit
              </Button>

            </Segment>
          </Form>
        </Grid.Column>

        <Grid.Column verticalAlign='left' width={8}>

          <Header as='h2' color='teal' textAlign='center'>
            Result:
          </Header>

          <Form size='large'>

            <Segment>
            <Container style={{minHeight:'100vh'}} textAlign='justified'></Container>
            </Segment>

          </Form>
        </Grid.Column>
        
      </Grid>
    )
  }
}

export default MainForm