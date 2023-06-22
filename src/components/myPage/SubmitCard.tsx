import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';

type Props = {
    title: string;
    imagePath: string;
    comment?: string;
};

export const SubmitCard = ({ title, imagePath, comment }: Props) => {
    return (
        <View style={styles.container}>
            <Card style={styles.card}>
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
