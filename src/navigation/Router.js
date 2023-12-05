import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigation";
import ListProduits from "../screens/Produits/ListProduits";
import FicheProduit from "../screens/Produits/FicheProduit";
import MotdepasseOublie from "../screens/Auth/Motdepasseoublie";
import Connexion from "../screens/Auth/Connexion";
import Inscription from "../screens/Auth/Inscription";

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Accueil"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Mot de passe Oublie" component={MotdepasseOublie} />
      <Stack.Screen name="Liste produits" component={ListProduits} />
      <Stack.Screen name="Fiche produit" component={FicheProduit} />
      <Stack.Screen name="Connexion" component={Connexion} />
      <Stack.Screen name="Inscription" component={Inscription} />
    </Stack.Navigator>
  );
}
