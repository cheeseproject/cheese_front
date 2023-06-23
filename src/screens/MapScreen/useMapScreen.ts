import { useEffect, useState } from 'react';
import {
    useFetchLikedSnapPosts,
    useFetchSnapPostsByGeographyRange,
} from '../../hooks/domain/snapPost/useFetchSnapPost';
import { useCreateSnapRoute } from '../../hooks/domain/snapRoute/useCreateSnapRoute';
import { useLocationInformation } from '../../hooks/useLocationInformation';

export const useMapScreen = () => {
    const { location } = useLocationInformation();
    const { data: likedSnapPosts = [] } = useFetchLikedSnapPosts();

    // TODO: 自分の投稿も含めるようにする
    const { data: snapPosts = [] } =
        useFetchSnapPostsByGeographyRange(location);

    // TODO: 過去セッションのいいねを表示
    /*
    こんな感じで
    const { sessionSnapPost } = useSessionSnapPost();
    */

    const [selectedSnapPostIds, setSelectedSnapPostIds] = useState<string[]>(
        []
    );
    const [title, setTitle] = useState<string>();

    // 現在選択中のボタンの値を管理する
    const [selectedButton, setSelectedButton] = useState<string>('all');

    const { mutate: createSnapRoute } = useCreateSnapRoute();

    // NOTE: 選択された投稿をルーツに加える時に使用
    const addSnapPostIdToRoute = (snapPostId: string) => {
        setSelectedSnapPostIds((prev) => [...prev, snapPostId]);
    };

    const handleChangeSelectedButton = (value: string) =>
        setSelectedButton(value);

    const handleSubmitSnapRoute = () => {
        // TODO: 入力のエラーハンドリング
        if (!title) return;
        if (selectedSnapPostIds.length === 0) return;
        const requestParams = {
            title,
            snapPostIds: selectedSnapPostIds,
        };
        createSnapRoute(requestParams, {
            onSuccess: () => console.log('success'),
            onError: (error) => console.log(error),
        });
    };

    return {
        location,
        title,
        snapPosts,
        likedSnapPosts,
        selectedButton,
        handleSubmitSnapRoute,
        addSnapPostIdToRoute,
        handleChangeSelectedButton,
    };
};
