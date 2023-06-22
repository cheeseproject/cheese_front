import React, { useEffect } from 'react';
import { useMyPageDetailScreen } from './useMyPageDetailScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

export const MyPageDetailScreen = () => {
    const { snapPost } = useMyPageDetailScreen();

    return <SafeAreaView></SafeAreaView>;
};
