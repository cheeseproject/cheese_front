import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
    useFetchLikedSnapPosts,
    useFetchMySnapPosts,
} from '../../hooks/domain/snapPost/useFetchSnapPost';
import { useFetchMyUser } from '../../hooks/domain/user/useFetchUser';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

export const useMyPageScreen = () => {
    const { data: mySnapPosts = [] } = useFetchMySnapPosts();
    const { data: myUser } = useFetchMyUser();
    const { data: likedSnapPosts = [] } = useFetchLikedSnapPosts();

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handlePressSnapPost = (snapPostId: string) => {
        console.log(snapPostId);
        navigation.navigate('MyPageDetail', { snapPostId });
    };

    return {
        mySnapPosts,
        likedSnapPosts,
        myUser,
        handlePressSnapPost,
    };
};
