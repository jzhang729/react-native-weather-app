import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  View,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import getImageForWeather from "./utils/getImageForWeather";
import { fetchLocationId, fetchWeather } from "./utils/api";

import SearchInput from "./components/SearchInput";

const App: React.FC = () => {
  const [location, setLocation] = useState("Toronto");
  const [temperature, setTemperature] = useState(0);
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleUpdateLocation = async (city: string) => {
    if (!city) return;
    setLoading(true);

    try {
      const locationId = await fetchLocationId(city);
      const {
        location: locationData,
        weather: weatherData,
        temperature: temperatureData,
      } = await fetchWeather(locationId);
      setLoading(false);
      setError(false);
      setLocation(locationData);
      setTemperature(temperatureData);
      setWeather(weatherData);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={getImageForWeather(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      />
      <View style={styles.detailsContainer}>
        <ActivityIndicator animating={loading} color="white" size="large" />
        {!loading && (
          <View>
            {error && (
              <Text style={[styles.smallText, styles.textStyle]}>
                Could not load weather, please try a different city.
              </Text>
            )}
            {!error && (
              <View>
                <Text style={[styles.largeText, styles.textStyle]}>
                  {location}
                </Text>
                <Text style={[styles.smallText, styles.textStyle]}>
                  {weather}
                </Text>
                <Text style={[styles.largeText, styles.textStyle]}>
                  {`${Math.round(temperature)}°`}
                </Text>
              </View>
            )}
          </View>
        )}

        <SearchInput
          placeholder="Search any city"
          onSubmit={handleUpdateLocation}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "white",
  },
  largeText: {
    fontSize: 44,
  },
  smallText: { fontSize: 18 },
  textInput: {
    backgroundColor: "#666",
    color: "white",
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  imageContainer: { flex: 1 },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },
});
