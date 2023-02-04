import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import RenderHtml from "react-native-render-html";
import AntDesign from "react-native-vector-icons/AntDesign";
import { contextAccount } from "../components/Context";
import React from "react";
import * as SQlite from "expo-sqlite";

const width = Dimensions.get("window").width;

export const Details = ({ route }) => {
  const { show } = route.params;

  const { liked, setLiked } = React.useContext(contextAccount);

  const db = SQlite.openDatabase("database.db");

  const handlePressLike = () => {
    if (liked.find((item) => item.show?.id === show.id)) {
      db.transaction((tx) =>
        tx.executeSql(
          "DELETE FROM liked WHERE show = ?",
          [JSON.stringify(show)],
          (obj, res) =>
            setLiked((prev) => prev.filter((item) => item.show?.id != show.id)),
          (obj, err) => (results = err)
        )
      );
    } else {
      db.transaction((tx) =>
        tx.executeSql(
          "INSERT INTO liked (show) VALUES (?)",
          [JSON.stringify(show)],
          (obj, res) => setLiked((prev) => [...prev, { id: show.id, show }]),
          (obj, err) => (results = err)
        )
      );
    }
    console.log(liked);
  };

  const isLiked = () => {
    return liked.find((item) => item.show?.id === show.id) ? "heart" : "hearto";
  };

  const showGenres = () => {
    return show.genres.map((genre) => (
      <Text
        style={{
          backgroundColor: "blue",
          padding: 2,
          borderRadius: 5,
          color: "white",
          margin: 5,
        }}
      >
        {genre}
      </Text>
    ));
  };

  return (
    <>
      <ScrollView style={{ width: width, marginBottom: 20 }}>
        <View style={styles.container}>
          <Text style={styles.title}>{show.name}</Text>
          <View style={styles.genres}>{showGenres()}</View>
          <Image
            source={
              show.image
                ? { uri: show.image.original }
                : require("../../assets/unavailable.jpeg")
            }
            style={styles.image}
          />
          <View style={styles.synopsis}>
            <Text style={styles.synopsis.title}>Synopsis</Text>
            <RenderHtml
              source={{ html: show.summary ?? "<b>There is no summary</b>" }}
              contentWidth={width}
              tagsStyles={styles.tagsStyles}
              enableExperimentalMarginCollapsing={true}
            />
          </View>
        </View>
      </ScrollView>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
    marginVertical: 15,
    fontWeight: "bold",
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
      fontWeight: "bold",
    },
  },
  genres: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "60%",
    marginBottom: 10,
  },
  heart: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  tagsStyles: {
    p: {
      lineHeight: 20,
    },
  },
});
