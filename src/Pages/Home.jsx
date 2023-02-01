import { View, Text, Dimensions, StyleSheet } from "react-native";
import { SearchBar } from "../components/SearchBar";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <SearchBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    textAlign: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    margin: 50,
  },
});
