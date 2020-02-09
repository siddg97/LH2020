import React from 'react'
import { Button, Form, Grid, Header, Segment, Container, } from 'semantic-ui-react'
import axios from 'axios';

class Dash extends React.Component {
  constructor(){
    super();
    this.state = {
      loading: false,
      URL:'',
      text: '',
      result: ''
    }
  }

  resetForm = () => this.setState({
    URL:'',
    text:'',
    result:'',
    loading: false
  });

  // Handling change in URL
  handleChange = (e, {name,value}) => this.setState({ [name]:value })  

  handleURL = () => {
    const { URL } = this.state;
    this.setState({loading:true})
    axios.post('http://localhost:5000/url', { url: URL })
      .then(resp => {
        this.setState({result: resp.data.result, loading:false})
      })
      .catch(err => console.error(err));
  }

  handleText = () => {
    const { text } = this.state;
    this.setState({loading:true})
    axios.post('http://localhost:5000/text',{ text })
      .then(resp => {
        this.setState({ result: resp.data.result, loading:false });
      })
      .catch(err => console.error(err));
  }

  render(){
    const { URL, text, result } = this.state;
    return (
      <Segment inverted style={{borderRadius:0}}>
        <Grid divided inverted>
          <Grid.Column verticalAlign='center' width={8}>
            <br/><br/><br/>
            <Segment inverted style={{minHeight:'100vh', borderRadius:0}}>
              <Header as='h2' color='red' textAlign='center'> Summarize with Ease </Header>
              <Form size='large'>
                <Segment inverted>
                  <Form.Input
                    label='URL'
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
                  <Form size='large'>
                    <Form.TextArea label='Article Text' name='text' value={text} placeholder='Place the text extract that you want to convert to Simple English' onChange={this.handleChange} />
                    <Button color='blue' fluid size='large' onClick={this.handleText}>
                      Summarize text
                    </Button>
                  </Form>
                </Segment>
                <Button onClick={this.resetForm} color='red' content='Reset' />
              </Form>
            </Segment>
          </Grid.Column>

          <Grid.Column verticalAlign='center' width={8}>
            <Segment inverted loading={this.state.loading} style={{minHeight:'100vh', borderRadius:0}}>
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