import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigation";
import ListProduits from "../screens/Produits/ListProduits";
import FicheProduit from "../screens/Produits/FicheProduit";
import Connexion from "../screens/Auth/Connexion";
import Inscription from "../screens/Auth/Inscription";
import Profil from "../screens/Auth/Profil";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

export default function Router() {
  const [userIsLog, setUserIsLog] = useState(null);
  console.log(userIsLog);

  const authState = () => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUserIsLog(user);
      } else {
        setUserIsLog(null);
      }
    });
  };
  useEffect(() => {
    authState();
  }, []);
  return (
    <>
      {userIsLog ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Accueil"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Liste produits" component={ListProduits} />
          <Stack.Screen name="Fiche produit" component={FicheProduit} />
          <Stack.Screen name="Profil" component={Profil} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Connexion"
            component={Connexion}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Inscription"
            component={Inscription}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </>
  );
}
