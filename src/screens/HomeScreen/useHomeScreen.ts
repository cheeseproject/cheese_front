import { shuffle } from 'fast-shuffle';
import { useLocationInformation } from '../../hooks/useLocationInformation';
import { useMemo, useState } from 'react';
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

    return {
        snapPosts: sortedSnapPosts,
        isSnapPostsLoading,
    };
};
