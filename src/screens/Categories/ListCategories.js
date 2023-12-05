import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { FIREBASE_DB } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function ListCategories({ navigation }) {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const categoriesCollection = collection(FIREBASE_DB, "category");
      const snapshot = await getDocs(categoriesCollection);

      const categoriesData = [];
      snapshot.forEach((categorie) => {
        categoriesData.push({
          id: categorie.id,
          name: categorie.data().name,
        });
      });
      setCategories(categoriesData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      {categories.map((data) => (
        <Pressable
          key={data.id}
          onPress={() =>
            navigation.navigate("Liste produits", { categoryId: data.id })
          }
          style={{
            width: Dimensions.get("window").width,
            paddingTop: 15,
            paddingBottom: 15,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              paddingLeft: 10,
              width: Dimensions.get("window").width - 25,
            }}
          >
            <Text>{data.name}</Text>
          </View>
          <View>
            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
          </View>
        </Pressable>
      ))}
      {/* <Text>ListCategories</Text>
      <Button
        title="Go to LISTE PRODUITS"
        onPress={() => navigation.navigate("Liste produits")}
      /> */}
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
