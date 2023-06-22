import React from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SubmitCard } from '../../components/myPage/SubmitCard';
import { useMyPageScreen } from './useMaPageScreen';
import { SnapPost } from '../../entities/SnapPost';

export const MyPageScreen = () => {
    const { mySnapPosts } = useMyPageScreen();

    const renderSubmitCard = (snapPost: SnapPost) => (
        <View style={{ flex: 0.5 }}>
            <SubmitCard
                title={snapPost.title}
                comment={snapPost.comment}
                imagePath={snapPost.postImages[0].imagePath}
            />
        </View>
    );

    return (
        <SafeAreaView>
            <FlatList
                data={mySnapPosts}
                renderItem={({ item }) => renderSubmitCard(item)}
                keyExtractor={(item) => item.snapPostId}
                numColumns={2}
            />
        </SafeAreaView>
    );
};
