import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { contextAccount } from "./src/components/Context";
import React from "react";
import * as SQlite from "expo-sqlite";

import { Home } from "./src/pages/Home";
import { List } from "./src/pages/List";
import { Details } from "./src/pages/Details";
import { Account } from "./src/pages/Account";

const stack = createNativeStackNavigator();

export default function App() {
  const [liked, setLiked] = React.useState([]);
  const db = SQlite.openDatabase("database.db");

  const accountIcon = ({ navigation, route }) => ({
    headerRight: () => (
      <MaterialIcons
        name="account-circle"
        size={40}
        color={"black"}
        onPress={() => navigation.navigate("Account")}
      />
    ),
    title: route.params
      ? route.params.show?.name ?? `Results of ${route.params.search}`
      : "CinemApp",
  });

  React.useEffect(() => {
    db.transaction((tx) =>
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS liked (show text NOT NULL)",
        null,
        (obj, res) => console.log("CREATE => ", res),
        (obj, err) => console.error(err)
      )
    );
    db.transaction((tx) =>
      tx.executeSql(
        "SELECT show FROM liked",
        null,
        (obj, res) => {
          setLiked(
            res.rows._array.map((item) => {
              return {
                show: JSON.parse(item.show),
              };
            })
          );
          console.log(liked);
        },
        (obj, err) => console.error(err)
      )
    );
  }, []);

  return (
    <NavigationContainer>
      <contextAccount.Provider value={{ liked, setLiked }}>
        <stack.Navigator>
          <stack.Screen name="Home" component={Home} options={accountIcon} />
          <stack.Screen name="List" component={List} options={accountIcon} />
          <stack.Screen
            name="Details"
            component={Details}
            options={accountIcon}
          />
          <stack.Screen name="Account" component={Account} />
        </stack.Navigator>
        <StatusBar style="auto" />
      </contextAccount.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
