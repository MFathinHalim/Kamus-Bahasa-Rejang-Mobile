// DatabasePage.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const DatabasePage = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    Indonesia: "",
    Rejang: "",
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://bouncy-earthy-radish.glitch.me/api/database"
      );
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengambil data dari database:",
        error
      );
    }
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddEntry = async () => {
    try {
      const response = await fetch(
        "https://bouncy-earthy-radish.glitch.me/api/post-database",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (result.success) {
        fetchData(); // Refresh data after adding a new entry
        setFormData({ Indonesia: "", Rejang: "" }); // Clear the form
      } else {
        console.error("Gagal menambahkan kata:", result.message);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menambahkan kata:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={[styles.heading, { color: "#FFF" }]}>
          Tambahkan Kata yang Tidak Ada!
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: "#EEE" }]}
          placeholder="Indonesia"
          autoComplete="off"
          value={formData.Indonesia}
          onChangeText={(text) => handleInputChange("Indonesia", text)}
        />
        <TextInput
          style={[styles.input, { backgroundColor: "#EEE" }]}
          placeholder="Rejang"
          autoComplete="off"
          value={formData.Rejang}
          onChangeText={(text) => handleInputChange("Rejang", text)}
        />
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: "#e2766c" }]}
          onPress={handleAddEntry}>
          <Text style={styles.buttonText}>Tambahkan!</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <Text style={[styles.heading, { color: "#FFF" }]}>Kamus Bacaan</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[styles.itemContainer, { backgroundColor: "#e2766c" }]}>
              <Text style={{ color: "#eee", fontSize: 25 }}>
                Indonesia: {item.Indonesia}
              </Text>
              <Text style={{ color: "#eee", fontSize: 25 }}>
                Rejang: {item.Rejang}
              </Text>
              {/* ... (your existing code for edit button and modal) ... */}
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#dd5f54",
  },
  formContainer: {
    marginBottom: 16,
  },
  listContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  addButton: {
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
  },
  itemContainer: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default DatabasePage;
