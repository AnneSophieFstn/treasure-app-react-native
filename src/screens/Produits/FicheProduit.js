import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Mario from "../../../assets/products/mario.jpg";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Button } from "@rneui/themed";
import { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";

export default function FicheProduit({ route }) {
  const { productId } = route.params;

  const [product, setProduct] = useState();

  const getProductById = async (productId) => {
    try {
      const productCollection = doc(collection(FIREBASE_DB, "toys"), productId);
      const queryProductSnapshot = await getDoc(productCollection);

      const productData = {
        id: queryProductSnapshot.id,
        name: queryProductSnapshot.data().name,
        description: queryProductSnapshot.data().description,
        color: queryProductSnapshot.data().color,
        dimensions: queryProductSnapshot.data().dimensions,
        material_type: queryProductSnapshot.data().material_type,
        weight: queryProductSnapshot.data().weight,
        age: queryProductSnapshot.data().age,
      };

      setProduct(productData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductById(productId);
  }, []);

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        {product ? (
          <View>
            <View>
              <Image source={Mario} style={{ width: "100%", height: 250 }} />
            </View>

            <View
              style={{
                backgroundColor: "white",
                borderRadius: 30,
                left: 0,
                right: 0,
                top: -28,
                bottom: 0,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: 15,
                  width: "100%",
                }}
              >
                <View></View>
                <Text style={styles.title_header}> {product.name}</Text>
                <Button
                  onPress={() => {
                    console.log("favoris");
                  }}
                  buttonStyle={{
                    borderRadius: 50,
                  }}
                  color="#ED1C25"
                >
                  <FontAwesome name="heart" size={15} color="white" />
                </Button>
              </View>
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></View>
              <View style={{ margin: 30 }}>
                <Text style={styles.text_orange}>DESCRIPTION</Text>
                <Text>{product.description}</Text>
              </View>
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></View>
              <View style={styles.row_infos}>
                <Text style={styles.text_orange}>Age: </Text>
                <Text>À partir de {product.age} ans</Text>
              </View>

              <View style={styles.row_infos}>
                <Text style={styles.text_orange}>Couleur: </Text>
                <Text>{product.color}</Text>
              </View>
              <View style={styles.row_infos}>
                <Text style={styles.text_orange}>Dimensions: </Text>
                <Text>{product.dimensions}</Text>
              </View>
              <View style={styles.row_infos}>
                <Text style={styles.text_orange}>Type de matériaux: </Text>
                <Text>{product.material_type}</Text>
              </View>
              <View style={styles.row_infos}>
                <Text style={styles.text_orange}>Poids: </Text>
                <Text>{product.weight} g</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.container}>
            <Text>Chargement en cours...</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  title_header: {
    fontWeight: "bold",
    fontSize: 20,
  },

  row_infos: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginLeft: 30,
    marginTop: 30,
  },

  text_orange: {
    color: "#EF6C32",
    fontWeight: "bold",
    fontSize: 15,
  },
});
