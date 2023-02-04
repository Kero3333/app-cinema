import {
  TouchableHighlight,
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";

export const Show = ({ nav, show }) => {
  const onPressShow = () => {
    nav.navigate("Details", { show });
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight activeOpacity={0.2} onPress={onPressShow}>
        <View>
          <Image
            source={
              show.image
                ? {
                    uri: show.image?.medium,
                  }
                : require("../../assets/unavailable.jpeg")
            }
            style={styles.image}
          />
          <Text style={styles.title}>{show.name}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    margin: 10,
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 150,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
  },
});
