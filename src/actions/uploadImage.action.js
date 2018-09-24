import axios from 'axios'

export default function uploadImage(data) {
  return (dispatch) => {
    const { formData, auth } = data
    console.log('===> auth data dari action upload image ==>', auth)
    dispatch({ type: 'UPLOAD_IMAGE_REQUEST' })
    axios({
      method: 'POST',
      url: 'http://susi-api.arisupriatna.com/aws/uploads3',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization: auth
      },
      data: formData
    })
      .then(({data}) => {
        dispatch({ type: 'UPLOAD_IMAGE_SUCCESS', payload: data })
        console.log('hasil upload ==>', data)
      })
      .catch((err) => {
        dispatch({ type: 'UPLOAD_IMAGE_FAILED', payload: err.message })
      })
  }
}