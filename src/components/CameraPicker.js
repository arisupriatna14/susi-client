import React, { Component } from 'react';
import { Image, View, Alert } from 'react-native'
import { Text, Button, Body, Header, Title, Left, Right } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

const options = {
  title: 'Options',
  takePhotoButtonTitle: 'Take image with your camera',
  chooseFromLibraryButtonTitle: 'Choose image from library',
}

export default class CameraPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatarSource: null,
      pic: null,
      filename: null,
      type: null,
      uri: null,
      url: null
    }
  }

  showImg = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response', response)

      if (response.didCancel) {
        console.log("User cancelled image picker")
      } else if (response.error) {
        console.log('Image picker error: ', response.error)
      } else {
        let source = { uri: response.uri }

        this.setState({
          avatarSource: source,
          filename: response.fileName,
          type: response.type,
          pic: response.data,
          uri: response.uri
        })
      }
    })
  }

  uploadImage =  () => {
    let formData = new FormData()
    let type = this.state.type
    formData.append('image', { uri: this.state.uri, name: this.state.filename, type })

    axios
      .post('https://imageuploader.adrowicaksono.xyz/upload', formData)
      .then(({data}) => {
        Alert.alert(
          'Susi says',
          'Upload image success'
        )
        console.log('hasil upload ==>', data.link)
      })
      .catch((err) => console.log(err))
  }

  render() {
    const { avatarSource } = this.state
    return (
      <View>
        <Header style={{backgroundColor: "#7fcb4b"}}>
          <Left>
            <Button transparent>
              <Icon name='chevron-left' size={20} color="#FFF" />
            </Button>
          </Left>
          <Body>
            <Title style={{color: '#FFF'}}>Camera Bot</Title>
          </Body>
          <Right>
            <Button transparent>
              <Text style={{fontWeight: 'bold'}}>Cancel</Text>
            </Button>
          </Right>
        </Header>
        <View style={{marginLeft: 5, marginBottom: 5, marginRight: 5, marginTop: 5}}>
        {
          avatarSource &&
          <Image
            source={avatarSource}
            style={{width: "100%", height: 300}}
          />
        }
          <Button onPress={this.showImg} block success style={{marginTop: 10}}>
            <Icon
              name="camera-retro"
              size={30}
              color="#fff"
            />
            <Text>Choose Image</Text>
          </Button>
          <Button onPress={this.uploadImage} style={{marginTop: 10}} block success> 
            <Icon
              name="upload"
              size={30}
              color="#fff"
            />
            <Text>Upload Image</Text>
          </Button>
        </View>
      </View>
    )
  }
}