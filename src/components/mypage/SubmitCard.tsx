import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';

type Props = {
    title: string;
    imagePath: string;
    comment?: string;
    onPress: () => void;
};

export const SubmitCard = ({ title, imagePath, comment, onPress }: Props) => {
    return (
        <View style={styles.container}>
            <Card style={styles.card} onPress={onPress}>
                <Card.Title title={title} subtitle={comment} />
                <Card.Content>
                    <Card.Cover source={{ uri: imagePath }} />
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 8,
    },
    card: {
        width: '100%',
        height: 300,
    },
});
