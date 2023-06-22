import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput, Divider } from 'react-native-paper';
import { useSubmitScreen } from './useSubmitScreen';
// import ImageLabeling from '@react-native-ml-kit/image-labeling';
import { Header } from './Header';
import { Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SubmitScreen = () => {
    const { handlePhotoEditBtn, handleSubmitSnapPost, goBack, control } =
        useSubmitScreen();

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
                                onPress={() => console.log('aa')}
                            />
                        }
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
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 16,
                }}
            ></ScrollView>
            {/* {image && (
                <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                />
            )} */}
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
        height: 200,
    },
    submitBtn: {
        marginTop: 64,
        width: 200,
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
