import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { useFetchSnapPost } from '../../hooks/domain/snapPost/useFetchSnapPost';
import { useUpdateSnapPost } from '../../hooks/domain/snapPost/useUpdateSnapPost';
import { useEffect, useState } from 'react';
import { useDeleteSnapPost } from '../../hooks/domain/snapPost/useDeleteSnapPost';

export const useMyPageDetailScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'MyPageDetail'>>();
    const { data: snapPost, isLoading } = useFetchSnapPost(
        route.params.snapPostId
    );
    const { mutate: updateSnapPost } = useUpdateSnapPost();
    const { mutate: deleteSnapPost } = useDeleteSnapPost();

    const [title, setTitle] = useState<string>();
    const [comment, setComment] = useState<string | undefined>();

    useEffect(() => {
        if (isLoading) return;
        if (!snapPost) return;
        setTitle(snapPost?.title);
        setComment(snapPost?.comment);
    }, [snapPost, isLoading]);

    const handleUpdateSnapPost = () => {
        // TODO: 入力のエラーハンドリング
        if (!title) return;
        updateSnapPost(
            {
                snapPostId: route.params.snapPostId,
                title,
                comment,
            },
            {
                onSuccess: () => console.log('success'),
                onError: (error) => console.log(error),
            }
        );
    };

    const handleDeleteSnapPost = () => {
        deleteSnapPost(route.params.snapPostId, {
            onSuccess: () => console.log('success'),
            onError: (error) => console.log(error),
        });
    };

    return {
        isLoading,
        snapPost,
        handleUpdateSnapPost,
        handleDeleteSnapPost,
    };
};
