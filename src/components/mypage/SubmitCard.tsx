import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

type Props = {
    title: string;
    imagePath: string;
    comment?: string;
    tags?: string[];
    onPress: () => void;
};

export const SubmitCard = ({
    title,
    imagePath,
    comment,
    tags,
    onPress,
}: Props) => {
    const Tag = (tag: string) => <Text style={styles.tag}>{tag}</Text>;

    return (
        <Card style={styles.card} onPress={onPress}>
            <Card.Cover source={{ uri: imagePath }} style={styles.cardImage} />

            <Card.Title
                title={<Text style={styles.title}>{title}</Text>}
                subtitle={
                    tags &&
                    tags.length > 0 && (
                        <FlatList
                            data={tags}
                            renderItem={({ item }) => Tag(item)}
                            keyExtractor={(_, index) => index.toString()}
                            // numColumns={2}
                            style={styles.tagList}
                        />
                    )
                }
            />
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    cardImage: {
        height: 200,
        width: 200,
        objectFit: 'cover',
        padding: 0,
    },

    tagList: {
        flexDirection: 'row',
    },

    tag: {
        borderWidth: 1,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        fontSize: 10,
        marginRight: 5,
        borderColor: 'gray',
    },

    title: {
        fontSize: 18,
    },
});
