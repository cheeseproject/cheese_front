import { STORAGE_KEYS } from '../../constants/storageKey';
import {
    UploadFileResult,
    useUploadFile,
} from '../../hooks/storage/useUploadFile';
import * as ImagePicker from 'expo-image-picker';
import { useLocationInformation } from '../../hooks/useLocationInformation';
import { useCreateSnapPost } from '../../hooks/domain/snapPost/useCreateSnapPost';
import { set, useForm } from 'react-hook-form';
import { CreateSnapPostRequest } from '../../repositories/snapPost/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { useLatLng } from '../../state/LngLat';

export type FormValues = {
    title: string;
    comment: string | undefined;
};

export type Coordinate = {
    latitude: number;
    longitude: number;
};

export const useSubmitScreen = () => {
    const [coordinate, setCoordinate] = useState<Coordinate>();
    const { location } = useLocationInformation();
    const { mutate: uploadFile, isLoading: isUploading } = useUploadFile();
    const { mutate: createSnapPost } = useCreateSnapPost();
    const navigation = useNavigation();
    const [selectedImages, setSelectedImages] = useState<UploadFileResult[]>(
        []
    );
    const { latLng, setLatLng } = useLatLng();
    const [tags, setTags] = useState<string>('');

    const defaultValues = useMemo(
        () => ({
            title: undefined,
            postImages: [],
            tags: [],
            comment: undefined,
        }),
        []
    );

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ defaultValues });

    //NOTE: locationが変更されたら、formの値を更新する
    useEffect(() => {
        if (!location) return;
        setCoordinate({
            latitude: location.latitude,
            longitude: location.longitude,
        });
    }, [location]);

    // NOTE: マップ画面から選択されたら、formの値を更新する
    useEffect(() => {
        if (!latLng) return;
        setCoordinate({
            latitude: latLng.latitude,
            longitude: latLng.longitude,
        });
    }, [latLng]);

    // NOTE: コンポーネントが破棄さらたら、latLngを初期化する
    useEffect(() => {
        return () => {
            setLatLng(undefined);
        };
    }, []);

    // 写真加工ボタン
    const handlePhotoEditBtn = async () => {
        const response =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!response.granted) return;

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (pickerResult.canceled) return;

        const { uri } = pickerResult.assets[0];

        uploadFile(
            {
                base64Url: uri,
                folderName: STORAGE_KEYS.SNAP_POST,
            },
            {
                onSuccess: (data) =>
                    setSelectedImages((prevState) => [...prevState, data]),
                onError: (error) => console.log(error),
            }
        );
    };

    const handleSubmitSnapPost = handleSubmit(async (data) => {
        // TODO: react hooks formに移行する。フォームエラーハンドリング
        if (!coordinate) return;
        if (tags.length === 0) return;
        if (selectedImages.length === 0) return;
        const params: CreateSnapPostRequest = {
            ...data,
            postImages: selectedImages.map((image) => ({
                imagePath: image.fileUrl,
            })),
            longitude: coordinate?.longitude,
            latitude: coordinate?.latitude,
            tags: tags.split(',').filter((tag) => tag.length > 0),
        };
        createSnapPost(params, {
            onSuccess: () => console.log('success'),
            onError: (error) => console.log(error),
        });
    });

    const goBack = () => {
        navigation.goBack();
    };

    return {
        handleSubmitSnapPost,
        handlePhotoEditBtn,
        goBack,
        tags,
        setTags,
        formErrors: errors,
        control,
        selectedImages,
        isUploading,
        coordinate,
    };
};
