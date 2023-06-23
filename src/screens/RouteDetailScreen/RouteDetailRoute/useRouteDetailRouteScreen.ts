import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';
import { useEffect } from 'react';

export const useRouteDetailRouteScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'RouteDetail'>>();
    console.log(route);
};
