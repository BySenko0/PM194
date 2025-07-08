// App.js

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  SectionList,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
  StatusBar,
  Modal,
  Button
} from 'react-native';

const CATEGORIES = [
  { key: 'fiction', title: 'Ficción' },
  { key: 'history', title: 'Historia' },
  { key: 'technology', title: 'Tecnología' },
];
const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].key);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [activeBook, setActiveBook] = useState(null);

  useEffect(() => {
    fetchBooks(selectedCategory);
  }, [selectedCategory]);

  const fetchBooks = async (categoryKey) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}${categoryKey}&maxResults=40`);
      const json = await res.json();
      const items = json.items || [];
      if (!items.length) {
        setSections([]);
        Alert.alert('Sin resultados', 'No se encontraron libros para esta categoría.');
        return;
      }
      const books = items
        .map(i => i.volumeInfo)
        .filter(b => b.title && b.authors && b.authors.length);
      const grouped = books.reduce((acc, book) => {
        const author = book.authors[0];
        if (!acc[author]) acc[author] = [];
        acc[author].push(book);
        return acc;
      }, {});
      const newSections = Object.entries(grouped).map(
        ([author, books]) => ({ title: author, data: books.slice(0, 2) })
      );
      setSections(newSections);
    } catch {
      Alert.alert('Error', 'Hubo un problema al cargar los libros.');
    } finally {
      setLoading(false);
    }
  };

  const renderCategoryButtons = () => (
    <View style={styles.categoryContainer}>
      {CATEGORIES.map(cat => (
        <TouchableOpacity
          key={cat.key}
          style={[
            styles.categoryButton,
            selectedCategory === cat.key && styles.categoryButtonActive
          ]}
          onPress={() => {
            setModalVisible(false);
            setSelectedCategory(cat.key);
          }}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === cat.key && styles.categoryTextActive
            ]}
          >
            {cat.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderBook = ({ item }) => (
    <TouchableOpacity
      style={styles.bookContainer}
      onPress={() => {
        setActiveBook(item);
        setModalVisible(true);
      }}
    >
      {item.imageLinks?.thumbnail && (
        <Image source={{ uri: item.imageLinks.thumbnail }} style={styles.thumbnail} />
      )}
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        {item.publisher && (
          <Text style={styles.bookPublisher}>Editorial: {item.publisher}</Text>
        )}
        <Text
          style={styles.bookDescription}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.description || 'Sin descripción.'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderCategoryButtons()}

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item, idx) => item.title + idx}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={renderBook}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Selecciona una categoría.</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}

      {/* Modal de detalle */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>{activeBook?.title}</Text>
            {activeBook?.imageLinks?.thumbnail && (
              <Image
                source={{ uri: activeBook.imageLinks.thumbnail }}
                style={styles.modalImage}
                resizeMode="cover"
              />
            )}
            {activeBook?.publisher && (
              <Text style={styles.modalPublisher}>
                Editorial: {activeBook.publisher}
              </Text>
            )}
            <Text style={styles.modalDescription}>
              {activeBook?.description || 'Sin descripción.'}
            </Text>
          </ScrollView>
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const THUMB_WIDTH = 80;
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  categoryTextActive: {
    color: '#fff',
  },
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#eef',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  bookContainer: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  thumbnail: {
    width: THUMB_WIDTH,
    height: THUMB_WIDTH * 1.4,
    borderRadius: 4,
    marginRight: 12,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  bookPublisher: {
    fontSize: 13,
    fontStyle: 'italic',
    marginVertical: 4,
  },
  bookDescription: {
    fontSize: 13,
    color: '#555',
  },
  emptyContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContent: {
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalImage: {
    width: width * 0.6,
    height: width * 0.85,
    borderRadius: 6,
    marginBottom: 12,
  },
  modalPublisher: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
  },
});
