import { View, Text, FlatList } from "react-native";
import React from "react";

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
        renderItem={({ item }) => <Text>{item.show.name}</Text>}
        keyExtractor={(item) => item.show.id}
      />
    </View>
  );
};
