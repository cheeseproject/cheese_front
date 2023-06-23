import { shuffle } from 'fast-shuffle';
import { useLocationInformation } from '../../hooks/useLocationInformation';
import { useEffect, useMemo, useState } from 'react';
import { useFetchSnapPostsByGeographyRange } from '../../hooks/domain/snapPost/useFetchSnapPost';
import { useLikeSnapPosts } from '../../hooks/domain/snapPost/useLikeSnapPost';

export const useHomeScreen = () => {
    const { location } = useLocationInformation();
    const [likesSnapPostIds, setLikesSnapPostIds] = useState<string[]>([]);

    const { data: snapPosts = [], isLoading: isSnapPostsLoading } =
        useFetchSnapPostsByGeographyRange(location);
    const sortedSnapPosts = useMemo(() => shuffle(snapPosts), [snapPosts]);

    const { mutate: likeSnapPosts } = useLikeSnapPosts();

    // NOTE: いいねしたSnapPostのIDを管理する
    const addLikedSnapPost = (snapPostId: string) => {
        setLikesSnapPostIds((prev) => [...prev, snapPostId]);
    };

    // NOTE: ここの処理はMapScreenかも？
    const handleLSubmitLikedIds = () => {
        // TODO: いいねしたとこうが0件の場合、何かしらの処理をする
        if (likesSnapPostIds.length === 0) return;
        likeSnapPosts(likesSnapPostIds, {
            onSuccess: () => console.log('success'),
            onError: (error) => console.log(error),
        });
    };

    useEffect(() => {
        const ids = [
            'fdee788c-5386-40cd-bc7e-a83aa5e85a70',
            '381b1f20-d3af-4879-a97f-8e6f75d57fa0',
            '5bc6181b-4f4d-42a8-afd6-e0945da1e338',
        ];
        likeSnapPosts(ids, {
            onSuccess: () => console.log('success'),
            onError: (error) => console.log(error),
        });
    }, []);

    return {
        snapPosts: sortedSnapPosts,
        isSnapPostsLoading,
    };
};
