import React, {useEffect, useState} from "react";
import { View, Text, FlatList,  TouchableOpacity, StyleSheet, Image} from "react-native";
import pokemonDataList from "../assets/pokemonList.json"
import { TextInput } from "react-native-gesture-handler";

const HomeScreen = ({navigation}) =>{
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const getPokemonList = async () => {
          try {
            setPokemonList(pokemonDataList);
          } catch (err) {
            setError(err.message);
          }
        };
        getPokemonList();
      }, []);

      useEffect(() => {
        const filteredList = pokemonList.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPokemonList(filteredList);
    }, [searchQuery, pokemonList]);

    const handleCardPress = (name) => {
      navigation.navigate('Details', { name });
    };


    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
        overflow: "scroll",
      },
      searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
        width: '100%',
      },
      card: {
        backgroundColor: '#FFFACD',
        borderRadius: 10,
        padding: 16,
        margin: 8,
        alignItems: 'center',
        width: '45%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        overflow: "scroll",
      },
      image: {
        width: 100,
        height: 100,
        marginBottom: 16,
      },
      name: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      error: {
        color: 'red',
      },
      noResults: {
        fontSize: 18,
        color: 'gray',
      },
    });

    return (
      <View style={styles.container}>
        <TextInput
            style={styles.searchInput}
            placeholder="Search Pokémon"
            value={searchQuery}
            onChangeText={setSearchQuery}
        />
        {error ? (
            <Text style={styles.error}>{error}</Text>
        ) : filteredPokemonList.length === 0 ? (
            <Text style={styles.noResults}>No Pokémon found</Text>
        ) : (
          <FlatList
            data={filteredPokemonList}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item.name)}>
                  <Image source={{ uri: item.sprite }} style={styles.image} />
                  <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
}

export default HomeScreen;