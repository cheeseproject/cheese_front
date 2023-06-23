import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

type Props = {
    title: string;
    imagePath: string;
    onPress: () => void;
};
export const RouteCard = ({ title, imagePath, onPress }: Props) => {
    return (
        <View style={styles.cardContainer}>
            <Card.Cover source={{ uri: imagePath }} style={styles.cardCover} />
            <View style={styles.cardTitleWrapper}>
                <Text style={styles.cardTItle}>{title}</Text>
            </View>

            <IconButton icon="dots-vertical" size={20} onPress={onPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingEnd: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
    },
    cardCover: {
        width: 150,
        height: 150,
    },
    cardTItle: {
        fontSize: 20,
    },
    cardTitleWrapper: {
        justifyContent: 'flex-start',
        flex: 1,
        paddingStart: 20,
    },
});
