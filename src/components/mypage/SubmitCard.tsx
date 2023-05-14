import React from 'react';
import { Card } from 'react-native-paper';

type Props = {
    item: {
        id: number;
        title: string;
        image: string;
    };
};


export const SubmitCard = ({ item }: Props) => {
    return (
        <Card>
            <Card.Title title="Card Title" subtitle="Card Subtitle" />
            <Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            </Card.Content>

        </Card>
    );
};
