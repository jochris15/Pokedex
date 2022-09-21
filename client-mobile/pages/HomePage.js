import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import BannerImage1 from '../assets/pokemon1.jpg'
import BannerImage2 from '../assets/pokemon2.jpg'
import BannerImage3 from '../assets/pokemon3.jpg'
import Carousel from 'react-native-banner-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

const BannerWidth = Dimensions.get('window').width * 0.9
const BannerHeight = Dimensions.get('window').height * 0.785
const LogoWidth = Dimensions.get('window').width * 0.5
const LogoHeight = Dimensions.get('window').height * 0.09
const images = [
    Image.resolveAssetSource(BannerImage1).uri,
    Image.resolveAssetSource(BannerImage2).uri,
    Image.resolveAssetSource(BannerImage3).uri,
];

export default function HomePage({ navigation }) {
    const renderPage = (image, index) => {
        return (
            <View key={index}>
                <TouchableOpacity onPress={() => navigation.navigate("AppNavigator")}>
                    <Image style={{ width: BannerWidth, height: BannerHeight, position: 'relative' }} source={{ uri: image }} />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.background}>
                <Image style={{ width: LogoWidth, height: LogoHeight, marginTop: 10 }} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" }} />

                <Card style={styles.card}>
                    <Carousel
                        autoplay
                        autoplayTimeout={4000}
                        loop
                        index={0}
                        pageSize={BannerWidth}
                    >
                        {images.map((image, index) => renderPage(image, index))}
                    </Carousel>
                </Card>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    card: {
        backgroundColor: '#f6f6f6',
        width: Dimensions.get('window').width * 0.9,
        margin: 20,
        justifyContent: 'space-between',
        textAlign: 'center'
    },
});
