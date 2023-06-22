import { useEffect } from 'react';
import { useFetchMySnapPosts } from '../../hooks/domain/snapPost/useFetchSnapPost';
import { useFetchMyUser } from '../../hooks/domain/user/useFetchUser';

export const useMyPageScreen = () => {
    const { data: mySnapPosts = [] } = useFetchMySnapPosts();
    const { data: myUser } = useFetchMyUser();

    return {
        mySnapPosts,
        myUser,
    };
};
