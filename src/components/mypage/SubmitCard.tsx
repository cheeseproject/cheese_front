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
        <View style={styles.container}>
            <Card style={styles.card} onPress={onPress}>
                <Card.Content>
                    <Card.Cover
                        source={{ uri: imagePath }}
                        style={styles.cardImage}
                    />
                </Card.Content>
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
                    style={styles.cardInfo}
                />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        padding: 8,
        width: '100%',
    },
    card: {
        width: '100%',
        height: 230,
        backgroundColor: '#fff',
        position: 'relative',
    },
    cardImage: {
        position: 'absolute',
        height: 170,
        width: '123%',
        objectFit: 'cover',
    },
    cardInfo: {
        position: 'absolute',
        top: 160,
        backgroundColor: '#fff',
    },
    tagList: {
        flexDirection: 'row',
    },
    tag: {
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 10,
        marginRight: 5,
    },
    title: {
        fontSize: 25,
    },
});
