import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MovieCard = ({ movie, onPress }) => {
  const { name, image, summary } = movie.show;

  const cleanSummary = summary ? summary.replace(/<[^>]+>/g, '') : 'No summary available';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: image?.medium || 'https://via.placeholder.com/150' }}
        style={styles.thumbnail}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.summary} numberOfLines={3}>
          {cleanSummary}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 10, 
  },
  thumbnail: {
    width: 120,
    height: 180,
    resizeMode: 'cover',
    borderRadius: 8, 
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'center', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    textTransform: 'uppercase', 
    letterSpacing: 1,
  },
  summary: {
    fontSize: 14,
    color: '#ddd',
    lineHeight: 20,
    marginTop: 4,
  },
});

export default MovieCard;
