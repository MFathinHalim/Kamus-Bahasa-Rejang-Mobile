import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import KagangaPage from './kaganga';
import DatabasePage from './database';
import * as Font from 'expo-font';

function HomeScreen({navigation}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([
    {
      id: 0,
      tj: 'Arti Muncul Disini',
      jt: 'kgf',
      mode: 0,
      textBahasa: 'Indonesia Ke Rejang',
    },
  ]);
  const [modeText, setModeText] = useState('Indonesia Ke Rejang');
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(async () => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          bangkahulu: require('./assets/fonts/bangkahulu.ttf'),
        });
        setFontLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    };

    await loadFonts();
  }, []);

  useEffect(() => {
    const fetchMode = async () => {
      try {
        const response = await fetch(
          'https://bouncy-earthy-radish.glitch.me/api/',
          {},
        );
        const data = await response.json();
        setModeText(data.data[0].textBahasa);
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil mode:', error);
        setModeText('Terjadi kesalahan saat mengambil mode');
      }
    };

    if (fontLoaded) {
      fetchMode();
    }
  }, [fontLoaded]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://bouncy-earthy-radish.glitch.me/api/search?value=${searchTerm}`,
      );
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error('Terjadi kesalahan saat mencari:', error);
      setSearchResults([]);
    }
  };

  const handleModeChange = async () => {
    try {
      const response = await fetch(
        'https://bouncy-earthy-radish.glitch.me/api/ganti',
        {
          method: 'POST',
        },
      );
      const data = await response.json();
      setModeText(data.data[0].textBahasa);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengganti mode:', error);
      setModeText('Terjadi kesalahan saat mengganti mode');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Kamus Rejang Kito!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Masukkan kata di sini"
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
          <TouchableOpacity
            style={styles.modeButton}
            onPress={handleModeChange}>
            <Text style={styles.buttonText}>{modeText}</Text>
          </TouchableOpacity>
          <Text style={[styles.cardText, {fontSize: 24}]}>{element.tj}</Text>
          <Text
            style={[styles.cardText, {fontSize: 24, fontFamily: 'bangkahulu'}]}>
            {element.jt}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

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
  secondText: {
    fontFamily: 'bangkahulu', // Ganti dengan font yang sesuai
  },
});

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Kamus Bahasa Rejang"
        screenOptions={{
          drawerLabelStyle: {color: '#eee'},
          drawerInactiveTintColor: '#eee',
          drawerActiveTintColor: '#eee',
        }}>
        <Drawer.Screen
          name="Kamus Bahasa Rejang"
          component={HomeScreen}
          options={{
            drawerStyle: {backgroundColor: '#b5483f'},
            headerStyle: {backgroundColor: '#b5483f'},
            headerTintColor: '#eee',
          }}
        />
        <Drawer.Screen
          name="Pencarian Kaganga"
          component={KagangaPage}
          options={{
            drawerStyle: {backgroundColor: '#b5483f'},
            headerStyle: {backgroundColor: '#b5483f'},
            headerTintColor: '#eee',
          }}
        />
        <Drawer.Screen
          name="Kamus Bacaan"
          component={DatabasePage}
          options={{
            drawerStyle: {backgroundColor: '#b5483f'},
            headerStyle: {backgroundColor: '#b5483f'},
            headerTintColor: '#eee',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
