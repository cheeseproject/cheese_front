import { atom, useRecoilState } from 'recoil';
import { SnapPost } from '../entities/SnapPost';
import { useEffect } from 'react';

const SwipeSubmitsState = atom<SnapPost[] | undefined | null>({
    key: 'swipesubmit', // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
});

export const useSwipeSubmits = () => {
    const [SwipeSubmits, setSwipeSubmits] = useRecoilState(SwipeSubmitsState);
    const handleSetSwipeSubmits = (swipesubmits: SnapPost[]) => {
        setSwipeSubmits(swipesubmits);
    };

    return {
        SwipeSubmits,
        handleSetSwipeSubmits,
    };
};
