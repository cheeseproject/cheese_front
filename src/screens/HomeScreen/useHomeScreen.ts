import { shuffle } from 'fast-shuffle';
import { useLocationInformation } from '../../hooks/useLocationInformation';
import { useEffect, useMemo, useState } from 'react';
import { useFetchSnapPostsByGeographyRange } from '../../hooks/domain/snapPost/useFetchSnapPost';
import { useLikeSnapPosts } from '../../hooks/domain/snapPost/useLikeSnapPost';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

export const useHomeScreen = () => {
    const { location } = useLocationInformation();
    const [likesSnapPostIds, setLikesSnapPostIds] = useState<string[]>([]);
     const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const { data: snapPosts = [], isLoading: isSnapPostsLoading } =
        useFetchSnapPostsByGeographyRange(location);
    const sortedSnapPosts = useMemo(() => shuffle(snapPosts), [snapPosts]);

    const { mutate: likeSnapPosts } = useLikeSnapPosts();

    // NOTE: いいねしたSnapPostのIDを管理する
    const addLikedSnapPost = (snapPostId: string) => {
        setLikesSnapPostIds((prev) => [...prev, snapPostId]);
    };

    // NOTE: ここの処理はMapScreenかも？
    const handleSubmitLikedIds = () => {
        // TODO: いいねしたとこうが0件の場合、何かしらの処理をする
        if (likesSnapPostIds.length === 0) return;
        likeSnapPosts(likesSnapPostIds, {
            onSuccess: () => console.log('success'),
            onError: (error) => console.log(error),
        });
    };

    const handleRouteMap = () => {
        navigation.navigate('Map');
    };

    return {
        snapPosts: sortedSnapPosts,
        isSnapPostsLoading,
        addLikedSnapPost,
        handleSubmitLikedIds,
        likesSnapPostIds,
        handleRouteMap,
    };
};
