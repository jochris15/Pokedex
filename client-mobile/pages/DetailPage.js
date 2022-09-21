import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StyleSheet, View, Image, Text, Dimensions } from 'react-native';

export default function DetailPage({ }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.background}>
                <Text>Test</Text>
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
});
