import React, { Component } from 'react';
import { Search } from 'sketch-icons';
import axios from 'axios';
import copy from "clipboard-copy";
import {
  Button,
  InputGroup,
  Text,
  Box,
  InputLeftElement,
  Flex,
  InputRightElement,
  Spacer,
  CloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  Progress,
  Container, 
  Image,
} from '@chakra-ui/react';
import Trash from './img1.png'
 
class Summarizer extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      docfile : null , 
      url: '',
      sideEffects: '',
      isLoading: false,
      visible: false,
      copyAlert : false ,  
      isImg : false,
    };
  }

 

  oceanTrash = async (e) => {
    e.preventDefault();

    //  set time out to show loading bar
    setTimeout(() => {
      this.setState({ isImg: true });
      }, 2000);

  }

  uploadFile = async(e) => {  

        this.setState({ 
        visible: false,
        isLoading: true,
      });

    e.preventDefault();
    const formData = new FormData(); 
    formData.append('file', this.state.docfile , this.state.docfile.name); 
    await axios({ 
      method: 'post', 
      url  : "http://localhost:8000/uploadfile/", 
      headers: {
        'Content-Type': 'application/json',
      },
      data : formData, 
    })
      .then(res => {
        this.setState({
          isLoading: false,
          visible: true,
          sideEffects: res.data['ocean'],
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
    
  }

  render() { 

    return (
      <Container maxW="container.xl" mt="10">
        <form onSubmit={this.oceanTrash}>
        <div className='row'> 
        <div className='col-11 col-md-11' >
        <input 
              type="file" 
              className='form-control'  
              accept='.doc,.docx,.pdf,.png,.jpg,.jpeg'
              onChange={(e) =>
                this.setState({
                  docfile: e.target.files[0],
                })
              }
              required
              />
        </div>
        <div className='col-1 col-md-1'>
        <button className='btn btn-primary' style={{'background' : '#0088CC' , 'borderRadius' : '8px' , 'fontWeight' : '600'}} type="submit" >
                    Upload
                </button>
        </div>
        </div>
               


        </form>
        <Spacer />

{this.state.copyAlert ? (
    <Alert status='success'>
    <AlertIcon />
    <Box>
      <AlertTitle>Copied!</AlertTitle> 
    </Box>
    <Spacer />
    <CloseButton
      alignSelf='flex-start'
      position='relative'
      right={-1}
      top={-1}
      onClick={() => this.setState({ copyAlert : false })}
    />
  </Alert> 

 
  
) : (
    <>
    </>
) 
}
<br />
        {this.state.isLoading ? (
              <Progress size="xs" isIndeterminate />
            ) : ( 
              <>
              </>
            )}

            {this.state.isImg ? (

          <Image boxSize={{ base: '500px', md: '555px' }} 
          objectFit="contain" 
          src = {Trash}
          alt="Trash" /> 
            ) : null} 
        
      </Container>
    );
  }
}

export default Summarizer;


