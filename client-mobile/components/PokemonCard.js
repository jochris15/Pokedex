import { Text, StyleSheet, Image, View, TouchableOpacity, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { Card, Button } from 'react-native-paper';

export default function PokemonCard({ pokemons, navigation }) {
    const [pokemonDetail, setPokemonDetail] = useState({});
    const [loading, setLoading] = useState(true)

    const fetchPokemonDetail = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemons.name}`)
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((msg) => {
                        throw msg
                    })
                }
                return res.json()
            })
            .then((payload) => {
                const types = payload.types.map((x) => x.type.name);
                const result = {
                    image: payload.sprites.other["official-artwork"].front_default,
                    types
                }
                setPokemonDetail(result);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false)
            })
    };

    const styleConditionalCard = () => {
        if (pokemonDetail.types[0] === "fire") {
            return styles.card1
        } else if (pokemonDetail.types[0] === "grass") {
            return styles.card2
        } else if (pokemonDetail.types[0] === "water") {
            return styles.card3
        } else {
            return styles.card
        }
    };

    const styleConditionalImage = () => {
        if (pokemonDetail.types[0] === "fire") {
            return styles.image1
        } else if (pokemonDetail.types[0] === "grass") {
            return styles.image2
        } else if (pokemonDetail.types[0] === "water") {
            return styles.image3
        } else {
            return styles.image
        }
    };

    const styleConditionalButton = () => {
        if (pokemonDetail.types[0] === "fire") {
            return "#f78d8c"
        } else if (pokemonDetail.types[0] === "grass") {
            return "#61e2c8"
        } else if (pokemonDetail.types[0] === "water") {
            return "#91d1ff"
        } else {
            return "#919191"
        }
    };

    useEffect(() => {
        fetchPokemonDetail()
    }, []);



    return (
        <TouchableOpacity onPress={() => navigation.navigate("DetailPage", {
            pokemonName: pokemons.name
        })}>
            {loading ? ((<Image style={{ width: 140, height: 100, marginTop: Dimensions.get('window').height * 0.2 }} source={{ uri: "https://raw.githubusercontent.com/gabriel-roque/design/master/pikachu_run.gif" }} />)) :
                <View style={styles.background}>
                    <Card style={styleConditionalCard()}>
                        <Card.Content style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'white', textAlign: 'center', marginBottom: 10, fontSize: 15, fontWeight: 'bold', }}>{pokemons.name.toUpperCase()}</Text>
                        </Card.Content>
                        <View
                            style={{
                                borderBottomColor: 'white',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                margin: 5,
                            }}
                        />
                        <Card.Cover style={styleConditionalImage()} source={{ uri: pokemonDetail.image }} />
                        <View
                            style={{
                                borderBottomColor: 'white',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                margin: 5,
                                marginBottom: 15,
                            }}
                        />
                        <Card.Content style={{ alignItems: 'center' }}>
                            {pokemonDetail.types.map((x) =>
                                <Button key={x} mode="elevated" style={{ marginBottom: 5 }} buttonColor={styleConditionalButton()} textColor="white">{x}</Button>
                            )}
                        </Card.Content>
                    </Card >
                </View>
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    card: {
        padding: 5,
        backgroundColor: 'gray',
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').height * 0.4,
        margin: 20,
        borderRadius: 20,
    },
    card1: {
        padding: 5,
        backgroundColor: '#fc6c6d',
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').height * 0.4,
        margin: 20,
        borderRadius: 20,
    },
    card2: {
        padding: 5,
        backgroundColor: '#49d0b1',
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').height * 0.4,
        margin: 20,
        borderRadius: 20,
    },
    card3: {
        padding: 5,
        backgroundColor: '#76beff',
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').height * 0.4,
        margin: 20,
        borderRadius: 20,
    },
    image: {
        margin: 10,
        flex: 2,
        backgroundColor: 'gray'
    },
    image1: {
        margin: 10,
        flex: 2,
        backgroundColor: '#fc6c6d'
    },
    image2: {
        margin: 10,
        flex: 2,
        backgroundColor: '#49d0b1'
    },
    image3: {
        margin: 10,
        flex: 2,
        backgroundColor: '#76beff'
    }
});