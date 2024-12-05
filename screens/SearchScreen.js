import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, StyleSheet, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';
import SerchCard from '../component/SerchCard';

const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([])
      return;
    }

    const timeoutId = setTimeout(() => {
      handleSearch(searchTerm);
    }, 500); 

    return () => clearTimeout(timeoutId); 

  }, [searchTerm]); 

  const handleSearch = (term) => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://api.tvmaze.com/search/shows?q=${term}`)
      .then((response) => {
        console.log('API Response:', response.data); 
        setSearchResults(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load search results. Please try again later.');
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for movies..."
        placeholderTextColor="#fff"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)} 
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.show.id.toString()}
          renderItem={({ item }) => {
            if (!item.show || !item.show.name) return null;
            return (
              <SerchCard
                movie={item.show}
                onPress={() => navigation.navigate('Details', { movieId: item.show.id })}
              />
            );
          }}
          ListEmptyComponent={
            searchTerm && !searchResults.length ? (
              <Text style={styles.noResults}>No results found.</Text>
            ) : null
          }
        />
      )}
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
    marginTop: 20,
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
  noResults: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default SearchScreen;
