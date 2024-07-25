import React, {useEffect, useState} from "react";
import { View, Text, FlatList,  TouchableOpacity, StyleSheet, Image} from "react-native";
import pokemonData from "../assets/pokemonDetails.json"

const DetailsScreen = ({route}) =>{
    const styles = StyleSheet.create({
        card: {
            flex: 1,
            margin: 20,
            padding: 20,
            borderRadius: 10,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
            alignItems: 'center'
        },
        header: {
            alignItems: 'center',
            marginBottom: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 10,
        },
        image: {
            width: 100,
            height: 100,
        },
        details: {
            flexDirection: 'column',
        },
        detailRow: {
            flexDirection: 'row',
            marginBottom: 10,
        },
        label: {
            fontWeight: 'bold',
            width: 150,
        },
        value: {
            flex: 1,
        },
        statsContainer: {
            marginTop: 20,
            width: '100%',
        },
        statsTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        statRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        },
        statName: {
            width: 120,
            fontWeight: 'bold',
        },
        statBarContainer: {
            flex: 1,
            height: 10,
            backgroundColor: '#e0e0e0',
            borderRadius: 5,
            marginHorizontal: 10,
            overflow: 'hidden',
        },
        statBar: {
            height: '100%',
            backgroundColor: '#76c7c0',
            borderRadius: 5,
        },
        statValue: {
            width: 50,
            textAlign: 'right',
        },
    });

    const [pokemonDetails, setPokemonDetails] = useState([]);
    const [error, setError] = useState(null);
    const { name } = route.params;

    useEffect(() => {
        const getPokemonDetails = async () => {
          try {
            setPokemonDetails(pokemonData);
            console.log(name);
          } catch (err) {
            setError(err.message);
          }
        };
        getPokemonDetails();
      }, [name]);

    const renderStats = ({ item }) => (
        <View style={styles.statRow}>
            <Text style={styles.statName}>{item.name}:</Text>
            <View style={styles.statBarContainer}>
                <View
                    style={[
                        styles.statBar,
                        { width: `${(item.level / 100) * 100}%` }
                    ]}
                />
            </View>
            <Text style={styles.statValue}>{item.level}</Text>
        </View>
    );

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Image source={{ uri: pokemonDetails.sprite }} style={styles.image} />
                <Text style={styles.title}>{pokemonDetails.name}</Text>
            </View>
            <View style={styles.details}>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Height:</Text>
                    <Text style={styles.value}>{pokemonDetails.height}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Weight:</Text>
                    <Text style={styles.value}>{pokemonDetails.weight}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Base Experience:</Text>
                    <Text style={styles.value}>{pokemonDetails.baseExperience}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Move:</Text>
                    <Text style={styles.value}>{pokemonDetails.move}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Specie:</Text>
                    <Text style={styles.value}>{pokemonDetails.specie}</Text>
                </View>
            </View>
            <View style={styles.statsContainer}>
                <Text style={styles.statsTitle}>Stats:</Text>
                <FlatList
                    data={pokemonDetails.stats}
                    renderItem={renderStats}
                    keyExtractor={(item) => item.name}
                />
            </View>
        </View>
    );
}

export default DetailsScreen;