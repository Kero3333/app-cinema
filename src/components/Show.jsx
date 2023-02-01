import {
  TouchableHighlight,
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";

export const Show = ({ navigation, show }) => {
  const onPressShow = () => {
    // navigation.navigate("Show", { show: show });
  };

  return (
    <View>
      <TouchableHighlight activeOpacity={1} onPress={onPressShow}>
        <View>
          <Image
            source={{
              uri: show.image?.medium,
            }}
            style={styles.image}
          />
          <Text>{show.name}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
  },
});
