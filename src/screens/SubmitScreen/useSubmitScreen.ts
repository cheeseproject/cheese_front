import { STORAGE_KEYS } from '../../constants/storageKey';
import { useUploadFile } from '../../hooks/storage/useUploadFile';
import * as ImagePicker from 'expo-image-picker';
import { useLocationInformation } from '../../hooks/useLocationInformation';
import { useCreateSnapPost } from '../../hooks/domain/snapPost/useCreateSnapPost';
import { useForm } from 'react-hook-form';
import { CreateSnapPostRequest } from '../../repositories/snapPost/types';
import { useNavigation } from '@react-navigation/native';

export type FormValues = CreateSnapPostRequest;

export const useSubmitScreen = () => {
    const { location } = useLocationInformation();
    const { mutate: uploadFile } = useUploadFile();
    const { mutate: createSnapPost } = useCreateSnapPost();
    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

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
                onSuccess: (data) => console.log(data),
                onError: (error) => console.log(error),
            }
        );
    };

    // const handleSubmitSnapPost = handleSubmit(async (data) => {
    //     createSnapPost(data, {
    //         onSuccess: goBack,
    //         onError: (error) => console.log(error),
    //     });
    // });

    const handleSubmitSnapPost = async () => {
        const data = {
            postImages: [
                {
                    imagePath: 'https://picsum.photos/200/300',
                    tag: 'nature',
                },
                {
                    imagePath: 'https://picsum.photos/200/300',
                    tag: 'landscape',
                },
            ],
            title: 'Sample Post',
            longitude: 123.456,
            latitude: 78.901,
            comment: 'This is a sample comment.',
        };
        createSnapPost(data, {
            onSuccess: goBack,
            onError: (error) => console.log(error),
        });
    };

    const goBack = () => {
        navigation.goBack();
    };
    return {
        handleSubmitSnapPost,
        handlePhotoEditBtn,
        goBack,
        formErrors: errors,
        control,
    };
};
