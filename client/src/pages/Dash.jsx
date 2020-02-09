import React from 'react'
import { Button, Form, Grid, Header, Segment, Icon, Container, } from 'semantic-ui-react'
import axios from 'axios';

class Dash extends React.Component {
  constructor(){
    super();
    this.state = {
      URL:'',
      file: null,
      text: '',
      result: ''
    }
  }
  // Handling change in URL
  handleChange = (e, {name,value}) => this.setState({ [name]:value })  

  handleURL = () => {
    const { URL } = this.state;
    axios.post('http://localhost:5000/url', { url: URL })
      .then(resp => {
        this.setState({result: resp.data.result })
      })
      .catch(err => console.error(err));
  }

  // Handling change for the PDF file
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file)
      .then(resp =>{
        this.setState({result:resp.data.result});
      })
      .catch(err => console.error(err))
  }
  
  fileUpload(file){
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post('http://localhost:5000/pdf', formData, config)
  }


  handleText = () => {
    const { text } = this.state;
    axios.post('http://localhost:5000/text',{ text })
      .then(resp => {
        this.setState({ result: resp.data.result });
      })
      .catch(err => console.error(err));
  }

  render(){
    const { URL, file, text, result } = this.state;
    return (
      <Segment inverted style={{borderRadius:0}}>
        <Grid inverted>
          <Grid.Column verticalAlign='center' width={8}>
            <Segment inverted style={{minHeight:'100vh', borderRadius:0}}>
              <Header as='h2' color='red' textAlign='center'> Summarize with Ease </Header>
              <Form size='large'>
                <Segment inverted>
                  <Form.Input 
                    fluid 
                    name='URL' 
                    value={URL} 
                    placeholder='Paste URL Link Here'
                    onChange={this.handleChange}
                  />
                  <Button color='green' fluid size='large' onClick={this.handleURL}>
                    Summarize URL
                  </Button>
                  <br/><br/>
                  <Segment placeholder>
                    <Header icon>
                      <Icon name='pdf file outline' />
                      <input type="file" onChange={this.handleChange} />
                    </Header>
                    <Form.Button fluid primary onClick={this.onFormSubmit}>Summarize PDF file</Form.Button>
                  </Segment>
                  <br/><br/>
                  <Form size='large'>
                    <Form.TextArea label='Article Text' name='text' value={text} placeholder='Place the text extract that you want to convert to Simple English' />
                    <Button color='blue' fluid size='large' onClick={this.handleURL}>
                      Summarize text
                    </Button>
                  </Form>
                </Segment>
              </Form>
            </Segment>
          </Grid.Column>

          <Grid.Column verticalAlign='center' width={8}>
            <Segment style={{minHeight:'100vh', borderRadius:0}}>
              <Header as='h2' color textAlign='center'>
                Summary:
              </Header>
              <Container textAlign='justified'>
              { result }
              </Container>
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

export default Dash