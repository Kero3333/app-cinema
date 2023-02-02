import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  ScrollView,
} from "react-native";
import RenderHtml from "react-native-render-html";

export const Details = ({ route }) => {
  const { show } = route.params;
  const { width } = useWindowDimensions();

  return (
    // <View style={styles.container}>
    <ScrollView style={{ width: width, marginBottom: 20 }}>
      <View style={styles.container}>
        <Text style={styles.title}>{show.name}</Text>
        <Image source={{ uri: show.image?.original }} style={styles.image} />
        <View style={styles.synopsis}>
          <Text style={styles.synopsis.title}>Synopsis</Text>
          <RenderHtml
            source={{ html: show.summary ?? "<b>There is no summary</b>" }}
            contentWidth={width}
          />
        </View>
        <View style={styles.genres}>
          <Text>Genres : </Text>
          <FlatList
            horizontal={true}
            ItemSeparatorComponent={<Text style={{ marginRight: 5 }}>,</Text>}
            data={show.genres}
            renderItem={({ item, index }) => <Text>{item}</Text>}
          />
        </View>
      </View>
    </ScrollView>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
    marginVertical: 20,
  },
  image: {
    height: 300,
    width: 200,
  },
  synopsis: {
    textAlign: "center",
    alignItems: "center",
    marginVertical: 10,
    title: {
      fontSize: 20,
    },
  },
  genres: {
    flexDirection: "row",
  },
});
