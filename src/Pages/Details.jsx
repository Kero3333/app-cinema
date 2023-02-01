import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  FlatList,
} from "react-native";
import RenderHtml from "react-native-render-html";

export const Details = ({ route }) => {
  const { show } = route.params;
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Text>{show.name}</Text>
      <Image source={{ uri: show.image?.original }} style={styles.image} />
      <View style={styles.synopsis}>
        <Text>Synopsis</Text>
        <RenderHtml
          source={{ html: show.summary ?? "<b>There is no summary</b>" }}
          contentWidth={width}
        />
      </View>
      <View>
        <Text>Genres :</Text>
        <FlatList
          data={show.genres}
          renderItem={({ item, index }) => <Text>{item}</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    height: 300,
    width: 200,
  },
});
