import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';

const DetailsScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/shows/${movieId}`)
      .then(response => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [movieId]);

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
        <Text style={styles.errorMessage}>Failed to load movie details. Please try again later.</Text>
      </View>
    );
  }

  return (
    movie && (
      <ScrollView style={styles.container}>
        <Image 
          source={{ uri: movie.image?.original || 'https://via.placeholder.com/300x200?text=No+Image+Available' }} 
          style={styles.image} 
        />
        <Text style={styles.title}>{movie.name}</Text>
        <View style={styles.genreContainer}>
          <Text style={styles.semititle}>Genres:</Text>
          <Text style={styles.details}>{movie.genres.join(', ')}</Text>
        </View>
        <View style={styles.genreContainer}>
          <Text style={styles.semititle}>Premiered:</Text>
          <Text style={styles.details}>{movie.premiered}</Text>
        </View>

        <View style={styles.genreContainer}>
          <Text style={styles.semititle}>Status:</Text>
          <Text style={styles.details}>{movie.status}</Text>
        </View>
        <Text style={styles.summary}>
          {movie.summary.replace(/<[^>]+>/g, '')}
        </Text>
        {movie.externals.imdb && (
          <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL(`https://www.imdb.com/title/${movie.externals.imdb}`)}>
            <Text style={styles.link}>View on IMDb</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingTop: 16,
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
  errorMessage: {
    color: '#ff4d4d',
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  semititle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 6,
    marginRight : 2
  },
  genreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 6,
  },
  summary: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 22,
    marginBottom: 20,
  },
  link: {
    color: 'white',
    fontSize: 18,

  },
  linkButton: {
    marginBottom: 30,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#1e90ff',
    paddingHorizontal: 20,
  },
});

export default DetailsScreen;
