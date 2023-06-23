import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, TextInput, Divider } from 'react-native-paper';
import { useSubmitScreen } from './useSubmitScreen';
// import ImageLabeling from '@react-native-ml-kit/image-labeling';
import { Header } from './Header';
import { Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useLatLng } from '../../state/LngLat';
import { SelectedImages } from '../../components/submit/SelectedImages';

type Props = {
    navigation: StackNavigationProp<any>;
};

export const SubmitScreen = ({ navigation }: Props) => {
    const {
        handlePhotoEditBtn,
        handleSubmitSnapPost,
        goBack,
        control,
        selectedImages,
    } = useSubmitScreen();
    const { latLng } = useLatLng();

    const handleNavMap = () => {
        navigation.navigate('SubmitMap');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header submit={handleSubmitSnapPost} goBack={goBack} />
            <Divider />

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label={'タイトル'}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="title"
            />

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label={'場所'}
                        right={
                            <TextInput.Icon
                                icon="map-marker"
                                onPress={handleNavMap}
                            />
                        }
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={`緯度:${latLng.latitude} 経度:${latLng.longitude}`}
                    />
                )}
                name="title"
            />

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label={'コメント'}
                        multiline={true}
                        numberOfLines={10}
                        style={styles.textarea}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="comment"
            />
            {selectedImages[0] && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 16,
                    }}
                >
                    <SelectedImages selectedImages={selectedImages} />
                </ScrollView>
            )}

            <Button
                mode="contained"
                icon={'camera'}
                style={styles.submitBtn}
                onPress={handlePhotoEditBtn}
            >
                写真を追加
            </Button>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#fff',
        height: '100%',
    },
    textarea: {
        height: 150,
    },
    submitBtn: {
        marginTop: 30,
        marginBottom: 30,
        width: 150,
        borderRadius: 500,
        alignSelf: 'center',
    },
    header: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
    },
    headerBackButton: {
        backgroundColor: 'onPrimary',
    },
    headerContentText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerContentSubmitButton: {
        margin: 0,
    },
    headerContentSubmitText: {
        fontSize: 18,
        color: '#147EFB',
        fontWeight: 'bold',
    },
});
