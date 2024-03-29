import { atom, useRecoilState } from 'recoil';
import { User } from '../entities/User';
import { LatLng } from 'react-native-maps';

const LatLngAtom = atom<LatLng | undefined>({
    key: 'userProfile', // unique ID (with respect to other atoms/selectors)
    default: { latitude: 0, longitude: 0 }, // default value (aka initial value)
});

export const useLatLng = () => {
    const [latLng, setLatLng] = useRecoilState(LatLngAtom);
    return {
        latLng,
        setLatLng,
    };
};
