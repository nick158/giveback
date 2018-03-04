import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  Form,
  Label,
  Alert,
  Input,
  Button,
  CardBody,
  FormGroup,
  CardHeader,
} from 'reactstrap';
import {
  Link,
  withRouter
} from 'react-router-dom';
import Loading from './Loading';
//import the Firebase UI Librrary
import {
  Firebase
} from '../../lib/firebase';
import * as firebaseui from 'firebaseui'

var provider = new Firebase.auth.FacebookAuthProvider();
provider.setCustomParameters({
  'display': 'popup'
});

class Login extends React.Component {
  //validation for the type of strings
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    error: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onFormSubmit(this.state)
      .then(() => this.props.history.push('/'))
      .catch(e => console.log(`Error: ${e}`));
  }
  handleClick() {
    const fp = Firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      //console.log(user);

      return user;
      //shorthand, normal user.dsf.dsf, instead this is destrcuturing, just pick out

      // ...
    }).catch(function (error){
      callback(error)
    })

    fp.then(function(user)

      {
        const {
          uid,
          displayName,
          email,
          photoUrl
        } = user;
        const firstName = displayName.split(' ')[0]
        const lastName = displayName.split(' ')[1]
        // console.log(firstName);
        // console.log(lastName);
        // console.log(uid);
        Firebase.database().ref('users/u3').set({
          first_name: firstName,
          last_name: lastName,
          email: email,
          profile_picture: photoUrl,
          employee_id: ''
        }).then(success => {
            console.log('success', success);
          },
          error => {
          //  console.log('error', error);
          callback(error)
          }
        );
      }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  render() {
    const {
      loading,
      error
    } = this.props;

    // Loading
    if (loading) return <Loading / > ;

    return (
      //anon function attached to button
      <
      Button onClick = {
        () => this.handleClick()
      } >
      testing <
      /Button>
    );
  }
}
function callback(err){
  alert(err)
}
export default withRouter(Login);
