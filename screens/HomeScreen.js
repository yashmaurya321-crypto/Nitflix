import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';
import MovieCard from '../component/MovieCard';

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load movies. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Movies..."
        placeholderTextColor="#fff"
        onFocus={() => navigation.navigate('Search')}
      />
      <FlatList
        data={movies}
        keyExtractor={item => item.show.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate('Details', { movieId: item.show.id })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    
  },
  searchBar: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    marginTop: 30,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
