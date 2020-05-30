import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
}

const SearchInput: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        placeholder={props.placeholder}
        placeholderTextColor="white"
        style={styles.textInput}
        clearButtonMode="always"
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 300,
    marginTop: 20,
    backgroundColor: "#666",
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: { flex: 1, color: "white" },
});

export default SearchInput;
