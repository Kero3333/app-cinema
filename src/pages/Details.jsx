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
import AntDesign from "react-native-vector-icons/AntDesign";
import { contextAccount } from "../components/Context";
import React from "react";

export const Details = ({ route }) => {
  const { show } = route.params;
  const { width } = useWindowDimensions();

  const { liked, setLiked } = React.useContext(contextAccount);

  const handlePressLike = () => {
    liked.indexOf(show.id) < 0
      ? setLiked((prev) => [...prev, show.id])
      : setLiked((prev) => prev.filter((id) => id != show.id));

    console.log(liked);
  };

  React.useEffect(() => {
    console.log(liked);
    console.log(liked.indexOf(show.id));
  }, []);

  const isLiked = () => {
    return liked.indexOf(show.id) >= 0 ? "heart" : "hearto";
  };

  return (
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
        <View style={styles.heart}>
          <AntDesign.Button
            name={isLiked()}
            activeOpacity={1}
            size={30}
            iconStyle={{
              color: "red",
              marginHorizontal: 10,
            }}
            style={{ width: "100%", padding: 0 }}
            backgroundColor="transparent"
            onPress={handlePressLike}
          />
        </View>
      </View>
    </ScrollView>
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
  heart: {
    position: "absolute",
    top: 20,
    right: 10,
  },
});
