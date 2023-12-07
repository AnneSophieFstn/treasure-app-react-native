import React, { useState } from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Logo from "../../../assets/logo-app.jpg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../firebaseConfig";

function Inscription({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);

  const samePassword = () => password === confirmPassword;

  const signUp = () => {
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <View
        style={{
          marginTop: 20,
        }}
      >
        <View
          style={{
            width: Dimensions.get("window").width - 40,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={Logo}
              style={{
                height: 200,
                width: 200,
                marginBottom: 30,
                borderColor: "green",
                overflow: "hidden",
              }}
              resizeMode="contain"
            />
          </View>
          <View>
            <Input
              placeholder="Entrer votre adresse email"
              onChangeText={(email) => setEmail(email)}
              value={email}
              leftIcon={
                <MaterialIcons name="alternate-email" size={18} color="black" />
              }
              containerStyle={{
                padding: 0,
                margin: 5,
              }}
              inputContainerStyle={{
                borderBottomWidth: 0,
                backgroundColor: "rgba(217, 217, 217, 0.24)",
                borderRadius: 25,
                paddingLeft: 15,
                paddingRight: 15,
              }}
            />
          </View>
          <View>
            <Input
              placeholder="Entrer votre mot de passe"
              secureTextEntry={isPasswordSecure}
              onChangeText={(password) => setPassword(password)}
              value={password}
              leftIcon={<Ionicons name="key-outline" size={18} color="black" />}
              rightIcon={
                isPasswordSecure ? (
                  <Ionicons
                    name="ios-eye-outline"
                    size={24}
                    color="black"
                    onPress={() => {
                      isPasswordSecure
                        ? setIsPasswordSecure(false)
                        : setIsPasswordSecure(true);
                    }}
                  />
                ) : (
                  <Ionicons
                    name="ios-eye-off-outline"
                    size={24}
                    color="black"
                    onPress={() => {
                      setIsPasswordSecure(true);
                    }}
                  />
                )
              }
              containerStyle={{
                padding: 0,
                margin: 5,
              }}
              inputContainerStyle={{
                borderBottomWidth: 0,
                backgroundColor: "rgba(217, 217, 217, 0.24)",
                borderRadius: 25,
                paddingLeft: 15,
                paddingRight: 15,
              }}
            />
          </View>
          <View>
            <Input
              placeholder="Confirmer votre mot de passe"
              secureTextEntry={isConfirmPasswordSecure}
              onChangeText={(confirmPassword) =>
                setConfirmPassword(confirmPassword)
              }
              value={confirmPassword}
              leftIcon={<Ionicons name="key-outline" size={18} color="black" />}
              rightIcon={
                isConfirmPasswordSecure ? (
                  <Ionicons
                    name="ios-eye-outline"
                    size={24}
                    color="black"
                    onPress={() => {
                      isConfirmPasswordSecure
                        ? setIsConfirmPasswordSecure(false)
                        : setIsConfirmPasswordSecure(true);
                    }}
                  />
                ) : (
                  <Ionicons
                    name="ios-eye-off-outline"
                    size={24}
                    color="black"
                    onPress={() => {
                      setIsConfirmPasswordSecure(true);
                    }}
                  />
                )
              }
              containerStyle={{
                padding: 0,
                margin: 5,
              }}
              inputContainerStyle={{
                borderBottomWidth: 0,
                backgroundColor: "rgba(217, 217, 217, 0.24)",
                borderRadius: 25,
                paddingLeft: 15,
                paddingRight: 15,
              }}
            />
          </View>

          {confirmPassword &&
            (samePassword() ? (
              <Button
                type="solid"
                titleStyle={{ color: "white" }}
                onPress={signUp}
                buttonStyle={{
                  borderRadius: 30,
                  backgroundColor: "#F68741",
                  paddingLeft: 30,
                  paddingRight: 30,
                  paddingBottom: 10,
                  paddingTop: 10,
                }}
              >
                Inscription
              </Button>
            ) : (
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "red" }}>
                  Vos mot de passe ne correspond pas!
                </Text>
              </View>
            ))}

          <View style={{ alignItems: "center" }}>
            <View style={{ margin: 15 }}>
              <Text>
                Vous avez déjà un compte ?
                <Text
                  style={{ fontWeight: "bold" }}
                  onPress={() => navigation.push("Connexion")}
                >
                  {" "}
                  Se connecter
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Inscription;
