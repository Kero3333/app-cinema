import { TextInput, View, Button } from "react-native";
import React from "react";

export const SearchBar = ({ navigation }) => {
  const [search, setSearch] = React.useState("");

  const onPressSearch = () => {
    console.log(search);
    // navigation.navigate("Home");
  };

  return (
    <View>
      <TextInput
        placeholder="Search..."
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      <Button title="search" onPress={onPressSearch} />
    </View>
  );
};
