import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Mario from "../../../assets/products/mario.jpg";
import Minion from "../../../assets/products/minion.jpg";
import Buzz from "../../../assets/products/buzz.jpg";
import Lego from "../../../assets/products/lego.jpg";
import Starwars from "../../../assets/products/starwars.jpg";
import Walle from "../../../assets/products/walle.jpg";
import { collection, where, query, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";
import { useEffect, useState } from "react";

export default function ListProduits({ navigation, route }) {
  const { categoryId } = route.params;
  const [products, setProduct] = useState([]);

  const fetchProductsByCategoryId = async (categoryId) => {
    try {
      const productsCollection = collection(FIREBASE_DB, "toys");

      const q = query(
        productsCollection,
        where("categoryId", "==", categoryId)
      );
      const querySnapshot = await getDocs(q);

      const productsData = [];
      querySnapshot.forEach((product) => {
        productsData.push({
          id: product.id,
          name: product.data().name,
          description: product.data().description,
          color: product.data().color,
          dimensions: product.data().dimensions,
          material_type: product.data().material_type,
          weight: product.data().weight,
          age: product.data().age,
        });
        setProduct(productsData);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProductsByCategoryId(categoryId);
  }, []);

  const produits = [
    {
      id: 1,
      image: Mario,
      titre: "Titre 1",
    },
    {
      id: 2,
      image: Minion,
      titre: "Titre 2",
    },
    {
      id: 3,
      image: Buzz,
      titre: "Titre 3",
    },
    {
      id: 4,
      image: Lego,
      titre: "Titre 4",
    },
    {
      id: 5,
      image: Starwars,
      titre: "Titre 5",
    },
    {
      id: 6,
      image: Walle,
      titre: "Titre 6",
    },
  ];

  const Item = ({ index, titre, image }) => (
    <Pressable
      key={index}
      style={{ alignItems: "center", marginRight: 10, marginBottom: 15 }}
      onPress={() => navigation.navigate("Fiche produit", { productId: index })}
    >
      <Image
        style={{ width: 170, height: 140, borderRadius: 15 }}
        source={image}
      />
      <Text style={{ margin: 5 }}>{titre}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <Item
            index={item.id}
            image={item.image}
            titre={item.name}
            style={{ marginRight: 10 }}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
