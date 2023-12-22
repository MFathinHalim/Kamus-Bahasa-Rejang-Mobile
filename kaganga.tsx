// Kaganga.js

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Button,
} from 'react-native';

const KagangaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([
    {
      tj: 'Arti Muncul Disini',
      jt: 'kgf',
    },
  ]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://bouncy-earthy-radish.glitch.me/api/searchKaganga?value=${searchTerm}`,
        {},
      );
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error('Terjadi kesalahan saat mencari:', error);
      setSearchResults([]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Kamus Rejang Kito!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Taruh Kata Disini"
          autoComplete="off"
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchIcon}>Cari</Text>
        </TouchableOpacity>
      </View>

      {searchResults.map(element => (
        <View key={element.id} style={styles.card}>
          <Text style={[styles.cardText, {fontSize: 25, color: '#FFF'}]}>
            {element.tj}
          </Text>
          <Text
            style={[
              styles.cardText,
              {fontFamily: 'bangkahulu', fontSize: 25, color: '#FFF'},
            ]}>
            {element.jt}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#dd5f54',
  },
  heading: {
    fontSize: 36,
    color: '#FFF',
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    marginRight: 8,
    padding: 16,
    borderRadius: 4,
    fontSize: 20,
  },
  searchButton: {
    backgroundColor: '#e2766c',
    padding: 16,
    borderRadius: 4,
    justifyContent: 'center',
  },
  searchIcon: {
    color: '#FFF',
    fontSize: 20,
  },
  card: {
    backgroundColor: '#e2766c',
    padding: 24,
    marginBottom: 24,
    borderRadius: 8,
  },
  modeButton: {
    backgroundColor: '#e2877f',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#eee',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardText: {
    color: '#FFF',
    marginBottom: 16,
    fontSize: 20,
  },
  firstText: {
    fontFamily: 'Arial', // Ganti dengan font yang sesuai
  },
  secondText: {
    fontFamily: 'Arial', // Ganti dengan font yang sesuai
  },
});

export default KagangaPage;
