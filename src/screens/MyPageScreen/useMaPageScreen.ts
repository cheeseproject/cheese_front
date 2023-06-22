import { useEffect } from 'react';
import {
    useFetchLikedSnapPosts,
    useFetchMySnapPosts,
} from '../../hooks/domain/snapPost/useFetchSnapPost';
import { useFetchMyUser } from '../../hooks/domain/user/useFetchUser';

export const useMyPageScreen = () => {
    const { data: mySnapPosts = [] } = useFetchMySnapPosts();
    const { data: myUser } = useFetchMyUser();
    const { data: likedSnapPost } = useFetchLikedSnapPosts();

    return {
        mySnapPosts,
        likedSnapPost,
        myUser,
    };
};
