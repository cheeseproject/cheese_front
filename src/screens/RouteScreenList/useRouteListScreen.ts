import { useFetchMySnapRoutes } from '../../hooks/domain/snapRoute/useFetchSnapRoute';

export const useRouteListScreen = () => {
    const { data: snapRoutes, isLoading } = useFetchMySnapRoutes();

    return {
        snapRoutes,
        isLoading,
    };
};
