import { useEffect } from 'react';
import { useFetchMySnapPosts } from '../../hooks/domain/snapPost/useFetchSnapPost';

export const useMyPageScreen = () => {
    const { data: mySnapPosts = [] } = useFetchMySnapPosts();

    return {
        mySnapPosts,
    };
};
