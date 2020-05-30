import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onSubmit: Function;
}

const SearchInput: React.FC<Props> = ({ onSubmit, placeholder }) => {
  const [text, setText] = useState("");

  const handleSubmitEditing = (): void => {
    if (!text) return;
    onSubmit(text);
    setText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor="white"
        style={styles.textInput}
        clearButtonMode="always"
        underlineColorAndroid="transparent"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSubmitEditing}
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
