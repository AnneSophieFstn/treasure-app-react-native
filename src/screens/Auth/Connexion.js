import React, { useState } from "react";
import { Alert, Dimensions, Image, Text, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Input, Button } from "@rneui/themed";
import Logo from "../../../assets/logo-app.jpg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../firebaseConfig";

function Connexion({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const signIn = () => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        navigation.navigate("Accueil", { screen: "Liste categories" });
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        <View style={{}}>
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
        <View style={{ alignItems: "center" }}>
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
        <View style={{ marginTop: 20 }}>
          <Button
            type="solid"
            titleStyle={{ color: "white" }}
            onPress={signIn}
            buttonStyle={{
              borderRadius: 30,
              backgroundColor: "#F68741",
              paddingLeft: 30,
              paddingRight: 30,
              paddingBottom: 10,
              paddingTop: 10,
            }}
          >
            Connexion
          </Button>
          <View style={{ alignItems: "center" }}>
            <View style={{ margin: 15 }}>
              <Text>
                Vous n'avez pas de compte ?{" "}
                <Text
                  style={{ fontWeight: "bold" }}
                  onPress={() => navigation.push("Inscription")}
                >
                  S'inscrire
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Connexion;
