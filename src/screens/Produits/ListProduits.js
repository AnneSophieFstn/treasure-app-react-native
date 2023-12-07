import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { collection, where, query, getDocs } from "firebase/firestore";
import { FIREBASE_STORAGE, FIREBASE_DB } from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";

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
      querySnapshot.forEach(async (product) => {
        const imageURL = await getDownloadURL(
          ref(FIREBASE_STORAGE, product.data().imageUrl)
        );

        productsData.push({
          id: product.id,
          name: product.data().name,
          imageUrl: imageURL,
          description: product.data().description,
          color: product.data().color,
          dimensions: product.data().dimensions,
          material_type: product.data().material_type,
          weight: product.data().weight,
          age: product.data().age,
        });
        await setProduct(productsData);

        //console.log(productsData);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProductsByCategoryId(categoryId);
  }, []);

  const Item = ({ index, titre, imageUrl }) => (
    <Pressable
      key={index}
      style={{ alignItems: "center", marginRight: 10, marginBottom: 15 }}
      onPress={() => navigation.navigate("Fiche produit", { productId: index })}
    >
      <Image
        style={{ width: 170, height: 140, borderRadius: 15 }}
        source={{ uri: imageUrl }}
      />
      <Text style={{ margin: 5 }}>{titre}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {products.length > 0 ? (
        <FlatList
          data={products}
          numColumns={2}
          renderItem={({ item }) => (
            <Item
              index={item.id}
              imageUrl={item.imageUrl}
              titre={item.name}
              style={{ marginRight: 10 }}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Pas de produit disponible pour la catégorie sélectionnée</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
