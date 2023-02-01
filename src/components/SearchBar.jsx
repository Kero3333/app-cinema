import { TextInput, View, Button, StyleSheet, Dimensions } from "react-native";
import React from "react";

const width = Dimensions.get("window").width;

export const SearchBar = ({ navigation }) => {
  const [search, setSearch] = React.useState("");

  const onPressSearch = () => {
    navigation.navigate("List", { search: search });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search..."
        onChangeText={(text) => setSearch(text)}
        value={search}
        style={styles.text}
      />
      <Button title="search" onPress={onPressSearch} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "10%",
  },
  text: {
    flex: 1,
    backgroundColor: "white",
    border: 1,
    borderColor: "red",
  },
});
