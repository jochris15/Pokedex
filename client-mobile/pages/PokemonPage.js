import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonCard from '../components/PokemonCard';

const LogoWidth = Dimensions.get('window').width * 0.5
const LogoHeight = Dimensions.get('window').height * 0.09

export default function PokemonPage({ navigation }) {
    const [pokemons, setPokemons] = useState()
    const [loading, setLoading] = useState(true)
    const [offset, setOffset] = useState(0)

    const fetchPokemons = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((msg) => {
                        throw msg
                    })
                }
                return res.json()
            })
            .then((payload) => {
                setPokemons(payload.results)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const nextPage = () => {
        setOffset(offset + 20)
    }

    const previousPage = () => {
        if (offset == 0) {
            setOffset(0)
        } else {
            setOffset(offset - 20)
        }
    }

    useEffect(() => {
        fetchPokemons()
    }, [offset])

    const renderItem = ({ item }) => {
        return <PokemonCard key={item.name} pokemons={item} navigation={navigation} />
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.background}>
                {loading ? ((<Image style={{ width: 300, height: 300, marginTop: Dimensions.get('window').height * 0.2 }} source={{ uri: "https://raw.githubusercontent.com/gabriel-roque/design/master/pikachu_run.gif" }} />)) :
                    (<FlatList
                        data={pokemons}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.name}
                        numColumns={2}
                        ListHeaderComponent={
                            <>
                                <Image style={{ width: LogoWidth, height: LogoHeight, marginTop: 10, alignSelf: 'center', marginBottom: 10 }} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" }} />
                                <View
                                    style={{
                                        borderBottomColor: '#2b73b9',
                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                        margin: 5,
                                    }}
                                />
                            </>
                        }
                        ListFooterComponent={
                            <>
                                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                    <Button mode="elevated" style={{ margin: 10 }} buttonColor="#ffcb05" onPress={() => previousPage()}>Previous Page</Button>
                                    <Button mode="elevated" style={{ margin: 10 }} buttonColor="#ffcb05" onPress={() => nextPage()}>Next Page</Button>
                                </View>
                            </>
                        }
                    />)
                }
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
        padding: 5,
        backgroundColor: '#f6f6f6',
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').height * 0.42,
        margin: 20,
    },
});
