import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-paper';

export default function DetailPage({ navigation, route }) {
    const { pokemonName } = route.params;
    const [pokemonDetail, setPokemonDetail] = useState([]);
    const [moves, setMoves] = useState({})
    const [loading, setLoading] = useState(true)
    const [tab, setTab] = useState('About')

    const fetchPokemonDetail = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((msg) => {
                        throw msg
                    })
                }
                return res.json()
            })
            .then((payload) => {
                fetch(`https://pokeapi.co/api/v2/move/${payload.moves[0].move.name}`)
                    .then((res) => {
                        if (!res.ok) {
                            return res.json().then((msg) => {
                                throw msg
                            })
                        }
                        return res.json()
                    })
                    .then((payload) => {
                        setMoves(payload)
                    })
                return payload
            })
            .then((payload) => {
                const abilities = payload.abilities.map((x) => x.ability.name)
                const types = payload.types.map((x) => x.type.name)

                const result = {
                    image: payload.sprites.other["official-artwork"].front_default,
                    abilities,
                    types,
                    height: payload.height,
                    weight: payload.weight,
                    stats: payload.stats
                }
                setPokemonDetail(result)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchPokemonDetail()
    }, []);

    const styleConditionalCard = () => {
        if (pokemonDetail.types[0] === "fire") {
            return styles.card1
        } else if (pokemonDetail.types[0] === "grass") {
            return styles.card2
        } else if (pokemonDetail.types[0] === "water") {
            return styles.card3
        } else if (pokemonDetail.types[0] === "bug") {
            return styles.card4
        } else if (pokemonDetail.types[0] === "poison") {
            return styles.card5
        } else if (pokemonDetail.types[0] === "electric") {
            return styles.card6
        } else if (pokemonDetail.types[0] === "fairy") {
            return styles.card7
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
        } else if (pokemonDetail.types[0] === "bug") {
            return styles.image4
        } else if (pokemonDetail.types[0] === "poison") {
            return styles.image5
        } else if (pokemonDetail.types[0] === "electric") {
            return styles.image6
        } else if (pokemonDetail.types[0] === "fairy") {
            return styles.image7
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
        } else if (pokemonDetail.types[0] === "bug") {
            return "#DABC92"
        } else if (pokemonDetail.types[0] === "poison") {
            return "#D094CB"
        } else if (pokemonDetail.types[0] === "electric") {
            return "#FFDC5F"
        } else if (pokemonDetail.types[0] === "fairy") {
            return "#F4A6B5"
        } else {
            return "#919191"
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.background}>
                <ScrollView>
                    {loading ? ((<Image style={{ width: 300, height: 300, marginTop: Dimensions.get('window').height * 0.2 }} source={{ uri: "https://raw.githubusercontent.com/gabriel-roque/design/master/pikachu_run.gif" }} />)) :
                        (
                            <Card style={styleConditionalCard()}>
                                <Card.Content style={{ margin: 10, alignItems: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: 'white' }}>{pokemonName.toUpperCase()}</Text>
                                </Card.Content>
                                <Card.Content style={{ alignSelf: 'center', flexDirection: 'row' }}>
                                    {pokemonDetail.types.map((x) =>
                                        <Button key={x} mode="elevated" style={{ margin: 5 }} buttonColor={styleConditionalButton()} textColor="white">{x}</Button>
                                    )}
                                </Card.Content>
                                <View
                                    style={{
                                        borderBottomColor: 'white',
                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                        margin: 10,
                                    }}
                                />
                                <Card.Cover style={styleConditionalImage()} source={{ uri: pokemonDetail.image }} />
                                <View
                                    style={{
                                        borderBottomColor: 'white',
                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                        margin: 10,
                                    }}
                                />
                                <View style={{ backgroundColor: 'white', borderRadius: 20, marginBottom: 10 }}>
                                    <Card.Content style={{ margin: 10, alignSelf: 'center', flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => setTab("About")}>
                                            <Text style={{ textAlign: 'left', fontSize: 17, fontWeight: 'bold', margin: 15, marginTop: 5, marginBottom: 5 }}>About</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setTab("Stats")}>
                                            <Text style={{ textAlign: 'left', fontSize: 17, fontWeight: 'bold', margin: 15, marginTop: 5, marginBottom: 5 }}>Base Stats</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setTab("Moves")}>
                                            <Text style={{ textAlign: 'left', fontSize: 17, fontWeight: 'bold', margin: 15, marginTop: 5, marginBottom: 5 }}>Moves</Text>
                                        </TouchableOpacity>
                                    </Card.Content>
                                </View>
                                {tab == 'About' && (
                                    <View style={{ backgroundColor: 'white', borderRadius: 20 }}>
                                        <Card.Content style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 17, }}>Height </Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{pokemonDetail.height} cm</Text>
                                        </Card.Content>
                                        <Card.Content style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 17, }}>Weight </Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{pokemonDetail.weight} kg</Text>
                                        </Card.Content>
                                        <Card.Content style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                            <Text style={{ fontSize: 17, }}>Abilities </Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{pokemonDetail.abilities.join(", ")}</Text>
                                        </Card.Content>
                                    </View>
                                )}
                                {tab == 'Stats' && (
                                    <View style={{ backgroundColor: 'white', borderRadius: 20 }}>
                                        <Card.Content style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 17, }}>HP </Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{pokemonDetail.stats[0].base_stat}</Text>
                                        </Card.Content>
                                        <Card.Content style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 17, }}>Attack </Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{pokemonDetail.stats[1].base_stat}</Text>
                                        </Card.Content>
                                        <Card.Content style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 17, }}>Defense </Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{pokemonDetail.stats[2].base_stat}</Text>
                                        </Card.Content>
                                        <Card.Content style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 17, }}>Sp. Atk </Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{pokemonDetail.stats[3].base_stat}</Text>
                                        </Card.Content>
                                        <Card.Content style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 17, }}>Sp. Def </Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{pokemonDetail.stats[4].base_stat}</Text>
                                        </Card.Content>
                                    </View>
                                )}
                                {tab == 'Moves' && (
                                    <View style={{ backgroundColor: 'white', borderRadius: 20 }}>
                                        <Card.Content style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 17, }}>Name </Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{moves.name}</Text>
                                        </Card.Content>
                                        <Card.Content style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 17, }}>Power </Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{moves.power}</Text>
                                        </Card.Content>
                                        <Card.Content style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 17, }}>PP </Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{moves.pp}</Text>
                                        </Card.Content>
                                        <Card.Content style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 17, }}>Priority </Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{moves.priority}</Text>
                                        </Card.Content>
                                    </View>
                                )}
                                <Button textColor="white" style={{ marginTop: 10 }} icon='arrow-left-bold' onPress={() => navigation.navigate("PokemonPage")}>Back to list</Button>
                            </Card>
                        )
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    card: {
        padding: 20,
        backgroundColor: 'gray',
        width: Dimensions.get('window').width * 0.9,
        margin: 20,
        justifyContent: 'space-between',
        textAlign: 'center',
        borderRadius: 20,
    },
    card1: {
        padding: 20,
        backgroundColor: '#fc6c6d',
        width: Dimensions.get('window').width * 0.9,
        margin: 20,
        justifyContent: 'space-between',
        textAlign: 'center',
        borderRadius: 20,
    },
    card2: {
        padding: 20,
        backgroundColor: '#49d0b1',
        width: Dimensions.get('window').width * 0.9,
        margin: 20,
        justifyContent: 'space-between',
        textAlign: 'center',
        borderRadius: 20,
    },
    card3: {
        padding: 20,
        backgroundColor: '#76beff',
        width: Dimensions.get('window').width * 0.9,
        margin: 20,
        justifyContent: 'space-between',
        textAlign: 'center',
        borderRadius: 20,
    },
    card4: {
        padding: 20,
        backgroundColor: '#C7AE8A',
        width: Dimensions.get('window').width * 0.9,
        margin: 20,
        justifyContent: 'space-between',
        textAlign: 'center',
        borderRadius: 20,
    },
    card5: {
        padding: 20,
        backgroundColor: '#AA7CA6',
        width: Dimensions.get('window').width * 0.9,
        margin: 20,
        justifyContent: 'space-between',
        textAlign: 'center',
        borderRadius: 20,
    },
    card6: {
        padding: 20,
        backgroundColor: '#FCCD25',
        width: Dimensions.get('window').width * 0.9,
        margin: 20,
        justifyContent: 'space-between',
        textAlign: 'center',
        borderRadius: 20,
    },
    card7: {
        padding: 20,
        backgroundColor: '#F2788F',
        width: Dimensions.get('window').width * 0.9,
        margin: 20,
        justifyContent: 'space-between',
        textAlign: 'center',
        borderRadius: 20,
    },
    image: {
        height: 300,
        margin: 10,
        backgroundColor: 'gray'
    },
    image1: {
        height: 300,
        margin: 10,
        backgroundColor: '#fc6c6d'
    },
    image2: {
        height: 300,
        margin: 10,
        backgroundColor: '#49d0b1'
    },
    image3: {
        height: 300,
        margin: 10,
        backgroundColor: '#76beff'
    },
    image4: {
        height: 300,
        margin: 10,
        backgroundColor: '#C7AE8A'
    },
    image5: {
        height: 300,
        margin: 10,
        backgroundColor: '#AA7CA6'
    },
    image6: {
        height: 300,
        margin: 10,
        backgroundColor: '#FCCD25'
    },
    image7: {
        height: 300,
        margin: 10,
        backgroundColor: '#F2788F'
    },
});
