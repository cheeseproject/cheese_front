import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
    useFetchLikedSnapPosts,
    useFetchMySnapPosts,
} from '../../hooks/domain/snapPost/useFetchSnapPost';
import { useFetchMyUser } from '../../hooks/domain/user/useFetchUser';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { useState } from 'react';

export const useMyPageScreen = () => {
    const { data: mySnapPosts = [], isLoading: isLoadingSnapPost } =
        useFetchMySnapPosts();
    const { data: myUser, isLoading: isLoadingUser } = useFetchMyUser();
    const { data: likedSnapPosts = [], isLoading: isLoadingLiked } =
        useFetchLikedSnapPosts();

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    // 現在選択中のボタンの値を管理する
    const [selectedButton, setSelectedButton] = useState<string>('post');
    const isActive = (value: string) => value === selectedButton;

    const handlePressSnapPost = (snapPostId: string) => {
        navigation.navigate('MyPageDetail', { snapPostId });
    };

    const handleChangeSelectedButton = (value: string) =>
        setSelectedButton(value);

    return {
        mySnapPosts,
        likedSnapPosts,
        myUser,
        handlePressSnapPost,
        selectedButton,
        handleChangeSelectedButton,
        isActive,
        isLoading: isLoadingSnapPost || isLoadingUser || isLoadingLiked,
    };
};
