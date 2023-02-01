import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { Show } from "../components/Show";

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
    <View>
      <Text>Resultats de {search} :</Text>
      <FlatList
        data={shows}
        renderItem={({ item }) => <Show show={item.show} nav={navigation} />}
        keyExtractor={(item) => item.show.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
