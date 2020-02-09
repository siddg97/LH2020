import React from 'react'
import { Button, Form, Grid, Header, Segment, Icon, Container, } from 'semantic-ui-react'
import axios, { post } from 'axios';

class MainForm extends React.Component {
  constructor(){
    super();
    this.state = {
      URL:'',
      file: null,
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  //Handling change in URL
  handleChange = (e, {URL,value}) => this.setState({ [URL]:value })  

  //Handling change for the PDF file
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    const url = 'http://example.com/file-upload';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }

  render(){
    const { URL, file } = this.state;
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

              <Segment placeholder onSubmit={this.onFormSubmit}>
                <Header icon>
                <Icon name='pdf file outline' />
                PDF file to be placed in here.
                <input type="file" onChange={this.onChange} />
                </Header>
                <Button primary>Submit PDF file</Button>
              </Segment>

              <Form.TextArea label='Text Article' placeholder='Place the text extract that you want to convert to Simple English' />

              <Button color='blue' fluid size='large'>
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