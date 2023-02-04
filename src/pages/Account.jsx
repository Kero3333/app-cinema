import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { contextAccount } from "../components/Context";
import { Show } from "../components/Show";

export const Account = ({ navigation }) => {
  const { liked, setLiked } = React.useContext(contextAccount);

  const getShows = () => {
    return liked?.map((item) => item.show);
  };

  React.useEffect(() => {
    console.log("----------------------------");
    console.log(liked);
  });

  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 30, marginVertical: 20 }}>
        Shows liked by you
      </Text>
      <FlatList
        horizontal={true}
        data={getShows()}
        renderItem={({ item }) => <Show show={item} nav={navigation} />}
        style={{ width: "auto" }}
      />
    </View>
  );
};
