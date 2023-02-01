import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Show } from "../components/Show";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const List = ({ navigation, route }) => {
  const { search } = route.params;

  const [shows, setShows] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
      .then((res) => res.json())
      .then((data) => setShows(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={{ alignItems: "center", height: "auto", marginBottom: 30 }}>
      <Text style={styles.result}>Results of {search} :</Text>
      <FlatList
        numColumns={2}
        columnWrapperStyle={{ width: "45%", margin: 0 }}
        data={shows}
        renderItem={({ item }) => <Show show={item.show} nav={navigation} />}
        keyExtractor={(item) => item.show.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  result: {
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 20,
  },
});
