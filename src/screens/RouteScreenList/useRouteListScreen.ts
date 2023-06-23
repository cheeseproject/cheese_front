import { useEffect } from 'react';
import { useFetchMySnapRoutes } from '../../hooks/domain/snapRoute/useFetchSnapRoute';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

export const useRouteListScreen = () => {
    const { data: snapRoutes = [], isLoading } = useFetchMySnapRoutes();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handlePressRoute = (snapRouteId: string) => {
        navigation.navigate('RouteDetail', { snapRouteId });
    };
    return {
        snapRoutes,
        isLoading,
        handlePressRoute,
    };
};
