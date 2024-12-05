import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const SerchCard = ({ movie, onPress }) => {
  if (!movie || !movie.name) {
    return null; 
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: movie.image?.medium }}
        style={styles.image}
      />
      <Text style={styles.title}>{movie.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c1c1c', 
    margin: 12,
    padding: 15,
    borderRadius: 12,
    overflow: 'hidden', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6, 
    transform: [{ scale: 1 }], 
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize', 
  },
});

export default SerchCard;
