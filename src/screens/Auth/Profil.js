import { StyleSheet, View } from "react-native";
import { Button } from "@rneui/themed";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../firebaseConfig";

export default function Profil({ navigation }) {
  const logOut = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        // Sign-out successful.
        navigation.navigate("Connexion");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Button
        type="solid"
        titleStyle={{ color: "white" }}
        onPress={logOut}
        buttonStyle={{
          borderRadius: 30,
          backgroundColor: "#F68741",
          paddingLeft: 30,
          paddingRight: 30,
          paddingBottom: 10,
          paddingTop: 10,
        }}
      >
        Déconnexion
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
