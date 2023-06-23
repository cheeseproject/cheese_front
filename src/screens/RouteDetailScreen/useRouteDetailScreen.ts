import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { useFetchSnapRoute } from '../../hooks/domain/snapRoute/useFetchSnapRoute';
import { useUpdateSnapRoute } from '../../hooks/domain/snapRoute/useUpdateSnapRoute';
import { useDeleteSnapRoute } from '../../hooks/domain/snapRoute/useDeleteSnapRoute';
import { useEffect, useState } from 'react';

export const useRouteDetailScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'RouteDetail'>>();
    const { data: snapRoutes, isLoading } = useFetchSnapRoute(
        route.params.routeId
    );
    const { mutate: updateSnapRoute } = useUpdateSnapRoute();
    const { mutate: deleteSnapRoute } = useDeleteSnapRoute();

    const [title, setTitle] = useState<string>();
    const [snapPostIds, setSnapPostIds] = useState<string[]>([]);

    useEffect(() => {
        if (isLoading) return;
        if (!snapRoutes) return;
        setTitle(snapRoutes?.title);
        setSnapPostIds(
            snapRoutes.snapPosts.map((snapPost) => snapPost.snapPostId)
        );
    }, [snapRoutes, isLoading]);

    const handleChangeTitle = (title: string) => setTitle(title);

    const addSnapPostInSnapRoute = (snapPostId: string) => {
        setSnapPostIds([...snapPostIds, snapPostId]);
    };

    const removeSnapPostInSnapRoute = (snapPostId: string) => {
        setSnapPostIds(snapPostIds.filter((id) => id !== snapPostId));
    };

    const handleUpdateSnapRoute = () => {
        // TODO: formのエラーハンドリング
        if (!title) return;
        if (!snapPostIds) return;
        updateSnapRoute(
            {
                snapRouteId: route.params.routeId,
                title,
                snapPostIds,
            },
            {
                onSuccess: () => console.log('success'),
                onError: (error) => console.log(error),
            }
        );
    };
    const handelDeleteSnapRoute = () => {
        deleteSnapRoute(route.params.routeId, {
            onSuccess: () => console.log('success'),
            onError: (error) => console.log(error),
        });
    };
    return {
        snapRoutes,
        isLoading,
        handleChangeTitle,
        addSnapPostInSnapRoute,
        removeSnapPostInSnapRoute,
        handleUpdateSnapRoute,
        handelDeleteSnapRoute,
    };
};
