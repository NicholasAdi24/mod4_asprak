import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import axios from "axios";

import Header from "../components/Header";

function HomeScreen() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://reqres.in/api/users/" + count.toString()
        );
        setData(response.data.data);
      } catch (error) {
        Alert.alert("Gagal!", error.message);
      }
    }

    fetchData();
  }, [count]);

  const prevButtonHandler = () => {
    const prevCount = count - 1;
    setCount(prevCount);
  };

  const nextButtonHandler = () => {
    const nextCount = count + 1;
    setCount(nextCount);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        headerIcon={"bell-o"}
        headerText={"Hi, There"}
        flexPosition={"flex-start"}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: data.avatar,
              }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              {data.first_name + " " + data.last_name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "gray",
              }}
            >
              {data.email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 12,
            }}
          >
            {count !== 1 ? (
              <TouchableOpacity
                onPress={prevButtonHandler}
                style={{
                  backgroundColor: "white",
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  marginTop: 24,
                  borderWidth: 2,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "400",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  Prev
                </Text>
              </TouchableOpacity>
            ) : (
              ""
            )}
            {count !== 12 ? (
              <TouchableOpacity
                onPress={nextButtonHandler}
                style={{
                  backgroundColor: "white",
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  marginTop: 24,
                  borderWidth: 2,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "400",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  Next
                </Text>
              </TouchableOpacity>
            ) : (
              ""
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
});

export default HomeScreen;
