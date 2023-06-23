import React from 'react';
import { SafeAreaView } from 'react-native';
import { Header } from './Header';
import { Appbar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
    navigation: StackNavigationProp<any>;
};

export const SubmitMapScreen = ({ navigation }: Props) => {
    const handleGoBack = () => {
        navigation.goBack();
    };
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={handleGoBack} />
            <Appbar.Content
                title="スポットを選択して、ピンを立ててください。"
                titleStyle={{ fontSize: 12 }}
            />
        </Appbar.Header>
    );
};
