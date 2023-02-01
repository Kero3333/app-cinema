import { View, Text } from "react-native";
import { SearchBar } from "./SearchBar";

export const Home = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
      <SearchBar navigation={navigation} />
    </View>
  );
};
