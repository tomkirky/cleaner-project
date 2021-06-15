import React, { useState } from "react";
import { ClientSignupForm } from "./registrationforms/clientRegForm";
import { CleanerSignupForm } from "./registrationforms/cleanersRegForm";
import firebase from "firebase";
import { useEffect } from "react";
import { db, auth } from "../firebase";
// import { db } from "../App";

const Register = ({ userType, navigation }) => {
  const [clientRegisterDetails, setClientRegisterDetails] = useState({
    name: "",
    postcode: "",
    username: "",
    email: "",
    password: "",
    photoURL:
      "https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png",
  });

  const [cleanerRegisterDetails, setCleanerRegisterDetails] = useState({
    companyName: "",
    companyPostcode: "",
    companyPhoneNumber: "",
    companyEmail: "",
    companyPassword: "",
    companyDescription: "",
  });

  const onRegister = () => {
    const { name, postcode, username, email, password, photoURL } =
      clientRegisterDetails;
    const {
      companyName,
      companyPostcode,
      companyPhoneNumber,
      companyEmail,
      companyPassword,
      companyDescription,
    } = cleanerRegisterDetails;

    if (userType === "client") {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          user.updateProfile({ photoURL });
        })
        .then(() => {
          db.collection("clients").doc(auth.currentUser.uid).set({
            name,
            postcode,
            username,
            email,
            photoURL,
          });
          // console.log(result);
          navigation.navigate("Home");
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            console.log("That email address is invalid!");
          }
          console.log(error); // NEED TO DISPLAY ERROR.MESSAGE
        });
    } else {
      auth
        .createUserWithEmailAndPassword(companyEmail, companyPassword)
        .then(() => {
          db.collection("cleaners").doc(auth.currentUser.uid).set({
            companyName,
            companyPostcode,
            companyPhoneNumber,
            companyEmail,
            companyDescription,
          });
          // console.log(result);
          navigation.navigate("Map");
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            console.log("That email address is invalid!");
          }
          console.log(error); // NEED TO DISPLAY ERROR.MESSAGE
        });
    }
  };

  ///////////////////////////////////// vvv THIS NEEDS TO GO INTO OTHER SCREEN - CLEANER LIST???
  // var usersRef = firebase.firestore().collection("users");
  // var query = usersRef.where("postcode", "==", "Manchester");
  // useEffect(() => {
  // 	firebase
  // 		.firestore()
  // 		.collection("users")
  // 		.where("postcode", "==", "Manchester")
  // 		.get()
  // 		.then((querySnapshot) => {
  // 			querySnapshot.forEach((doc) => {
  // 				// doc.data() is never undefined for query doc snapshots
  // 				console.log(doc.id, " => ", doc.data());
  // 			});
  // 		});
  // }, []);
  ////////////////////////////////////
  if (userType === "client") {
    return (
      <ClientSignupForm
        setClientRegisterDetails={setClientRegisterDetails}
        onRegister={onRegister}
      />
    );
  } else {
    return (
      <CleanerSignupForm
        setCleanerRegisterDetails={setCleanerRegisterDetails}
        onRegister={onRegister}
      />
    );
  }
};

// export class Register extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			email: "",
// 			password: "",
// 			name: "",
// 		};

// 		this.onSignUp = this.onSignUp.bind(this);
// 	}

//     onSignUp() {
//         const { email, password, name} = this.state;
// 		firebase.auth().createUserWithEmailAndPassword(email, password)
// 		.then((result) => {
// 			console.log(result)
// 		})
// 		.catch((error) => {
// 			console.log(error)
// 		})
//     }

// 	render() {
// 		return (
// 			<View>
// 				<TextInput
// 					placeholder="name"
// 					onChangeText={(name) => this.setState({ name })}
// 				/>
// 				<TextInput
// 					placeholder="email"
// 					onChangeText={(email) => this.setState({ email })}
// 				/>
// 				<TextInput
// 					placeholder="password"
// 					secureTextEntry={true}
// 					onChangeText={(password) => this.setState({ password })}
// 				/>

// 				<Button onPress={() => this.onSignUp()} title="Sign Up" />
// 			</View>
// 		);
// 	}
// }

export default Register;
