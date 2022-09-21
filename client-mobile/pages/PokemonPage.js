import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonCard from '../components/PokemonCard';

const LogoWidth = Dimensions.get('window').width * 0.5
const LogoHeight = Dimensions.get('window').height * 0.09

export default function PokemonPage({ navigation }) {
    const [pokemons, setPokemons] = useState()
    const [loading, setLoading] = useState(true)

    const fetchPokemons = () => {
        fetch('https://pokeapi.co/api/v2/pokemon')
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

    useEffect(() => {
        fetchPokemons()
    }, [])

    const renderItem = ({ item }) => {
        return <PokemonCard key={item.name} pokemons={item} navigation={navigation} />
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.background}>
                {loading ? ((<Image style={{ width: 300, height: 300, marginTop: Dimensions.get('window').height * 0.2 }} source={{ uri: "https://static.wixstatic.com/media/3a2cb4_63eebbbf6f204a38a1eec5c2d55e6301~mv2.gif" }} />)) :
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
