import React from 'react';
import { Button, Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export const Header = () => {
    return (
        <View style={styles.header}>
            <View style={styles.contentWrapper}>
                <Text style={styles.contentText}>マイページ</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        backgroundColor: '#000',
    },

    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    contentWrapper: {
        width: '33%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
