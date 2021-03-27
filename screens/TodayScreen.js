import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { getCurrentDate } from "../src/commonUtill";

const WEATHER_API_KEY = "c5477876d6955b2d33be8b747f1718f3";

const TodayScreen = () => {
  const [location_S, setLocation_S] = useState(null);
  const [errMsg_S, setErrMsg_S] = useState(``);

  const [viewDate, setViewDate] = useState(`0000. 00. 00 (0)`);
  const [viewTime, setViewTime] = useState(`00:00`);

  const [currentTemp, setCurrentTemp] = useState(`0`);
  const [currentCity, setCurrentCity] = useState(``);

  const [maxTemp, setMaxTemp] = useState(`0`);
  const [minTemp, setMinTemp] = useState(`0`);

  const [weatherStatus, setWeatherStatus] = useState(``);

  setInterval(() => {
    const { currentDate, currentTime } = getCurrentDate();
    setViewDate(currentDate);
    setViewTime(currentTime);
  }, 1000);
  useEffect(() => {
    const { currentDate, currentTime } = getCurrentDate();
    setViewDate(currentDate);
    setViewTime(currentTime);
    (async () => {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        setErrMsg_S("Refuse Permission This Device.");
        return;
      }

      const locData = await Location.getCurrentPositionAsync();
      setLocation_S(locData);
      try {
        // const weather = await axios.get(
        //  `api.openweathermap.org/data/2.5/weather?lat=${locData.coords.latitude}&lon=${locData.coords.longitude}&appid=${WEATHER_API_KEY}`
        // );
        const weather = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${locData.coords.latitude}&lon=${locData.coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`
        )
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            console.log(json.name);
            const temp = String(json.main.temp).split(".")[0];
            // 소수점을 기준으로 배열로 나눠지게함
            const minTemp = String(json.main.temp_min).split(".")[0];
            const maxTemp = String(json.main.temp_max).split(".")[0];
            console.log(json.weather[0].description);

            const status = json.weather[0].description;

            switch (status) {
              case "clear sky":
                setWeatherStatus("날씨가 좋아요. 외출은 어때요?");
                break;

              case "Moderate rain":
                setWeatherStatus("비가오고 있어요 우산은 챙겼나요?");
              case "few clouds":
                setWeatherStatus("오늘은 조금 흐리네요.");
                break;

              case "scattered clouds":
                setWeatherStatus("구름이 많아요.");
                break;

              case "broken clouds":
                setWeatherStatus("비가 올 것 같아요. 우산을 챙겨주세요.");
                break;

              case "shower rain":
                setWeatherStatus("비가 오고 있어요. 우산은 챙기셨죠?");
                break;

              case "rain":
                setWeatherStatus("비가 오고 있어요. 우산은 챙기셨죠?");
                break;

              case "thunderstorm":
                setWeatherStatus("태풍이 오고 있어요. 외출을 자제해 주세요.");
                break;

              case "snow":
                setWeatherStatus("눈 좋아하시나요? 눈이 오고 있어요.");
                break;

              case "mist":
                setWeatherStatus("안개가 심해요. 조심하세요.");
                break;
            }

            setCurrentCity(json.name);
            setCurrentTemp(temp);
            setMinTemp(minTemp);
            setMaxTemp(maxTemp);
          });
      } catch (e) {
        console.log(e);
        return;
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.box_1}>
        <Text style={styles.timeText}>{viewTime}</Text>
        <Text style={styles.dateText}>{viewDate}</Text>
      </View>
      <View style={styles.box_2}>
        <Text style={styles.statusText}>{weatherStatus}</Text>
        <Text style={styles.tempText}>{currentTemp}℃</Text>
        <View style={styles.tempUnderLine}></View>
      </View>
      <View style={styles.box_3}>
        <Text style={styles.cityText}>{currentCity}</Text>
      </View>
      <View style={styles.box_4}>
        <View style={styles.box_4_box}>
          <Text style={styles.tempGuideText1}>최고기온</Text>
          <Text style={styles.minMaxTemp}>{maxTemp}℃</Text>
        </View>
        <View style={styles.box_4_box}>
          <Text style={styles.tempGuideText2}>최저기온</Text>
          <Text style={styles.minMaxTemp}>{minTemp}℃</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box_1: {
    width: `100%`,
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  dateText: {
    fontSize: 19,
    color: `#718093`,
  },
  timeText: {
    fontSize: 34,
    fontWeight: `700`,
  },
  statusText: {
    fontSize: 18,
    fontWeight: `500`,
    marginBottom: 100,
  },
  box_2: {
    width: `100%`,
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  tempText: {
    fontWeight: `500`,
    fontSize: 90,
  },
  tempUnderLine: {
    width: `60%`,
    height: 5,
    borderRadius: 20,
    marginTop: -10,
    backgroundColor: `#333`,
  },
  box_3: {
    width: `100%`,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  cityText: {
    fontSize: 25,
    fontWeight: `500`,
    marginTop: 15,
    color: `#718093`,
  },
  box_4: {
    width: `100%`,
    flex: 2,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  box_4_box: {
    width: `40%`,
    height: `100%`,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tempGuideText1: {
    fontSize: 26,
    fontWeight: `500`,
    padding: 5,
    color: `#e74c3c`,
  },
  tempGuideText2: {
    fontSize: 26,
    fontWeight: `500`,
    padding: 5,
    color: `#3498db`,
  },
  minMaxTemp: {
    fontSize: 20,
    fontWeight: `400`,
  },
});

export default TodayScreen;
