import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import axios from "axios";

import Header from "../components/Header";

function AnimeScreen() {
  const [data, setData] = useState([]);
  const [seasonData, setSeasonData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/top/anime?page=${page}`
        );
        setData(response.data.data);
      } catch (error) {
        Alert.alert("Gagal!", error.message);
      }
    }

    fetchData();
  }, [page]);

  useEffect(() => {
    async function fetchSeasonData() {
      try {
        const response = await axios.get(
          "https://api.jikan.moe/v4/seasons/now"
        );
        setSeasonData(response.data.data);
      } catch (error) {
        Alert.alert("Gagal!", error.message);
      }
    }

    fetchSeasonData();
  }, []);

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const renderAnimeItem = ({ item }) => {
    return (
      <View style={styles.animeItem}>
        <Image source={{ uri: item.images.jpg.image_url }} style={styles.animeImage} />
        <View style={styles.animeInfo}>
          <Text style={styles.animeTitle}>{item.title}</Text>
          <Text style={styles.animeScore}>Score: {item.score}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header headerIcon="bell-o" headerText="MyAnimeList" flexPosition="flex-start" />
      
      <View style={styles.seasonContainer}>
        <Text style={styles.seasonTitle}>This Season</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.seasonList}>
          {seasonData.map((item) => (
            <View key={item.mal_id} style={styles.seasonItem}>
              <Image source={{ uri: item.images.jpg.image_url }} style={styles.seasonImage} />
              <Text style={styles.seasonItemTitle}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.paginationTop}>
        <TouchableOpacity style={styles.paginationButton} onPress={prevPage}>
          <Text style={styles.paginationText}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paginationButton} onPress={nextPage}>
          <Text style={styles.paginationText}>Next</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderAnimeItem}
        keyExtractor={(item) => item.mal_id.toString()}
        contentContainerStyle={styles.animeList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  paginationTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  seasonContainer: {
    marginBottom: 16,
  },
  seasonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  seasonList: {
    marginBottom: 16,
  },
  seasonItem: {
    marginRight: 16,
  },
  seasonImage: {
    width: 150,
    height: 200,
    borderRadius: 8,
    alignContent : "center",
  },
  seasonItemTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  animeList: {
    padding: 16,
  },
  animeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  animeImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    alignContent: "center",
  },
  animeInfo: {
    marginLeft: 16,
    flex: 1,
  },
  animeTitle: {
    fontSize: 20,
    fontWeight: "600",
    color : "black",
  },
  animeScore: {
    fontSize: 16,
    color: "black",
  },
  paginationButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  paginationText: {
    color: "black",
    fontWeight: "400",
    textAlign: "center",
    fontSize: 16,
  },
});

export default AnimeScreen;
