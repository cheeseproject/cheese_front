
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
    Button,
    TextInput,
    Divider,
    ActivityIndicator,
} from 'react-native-paper';
import { useSubmitScreen } from './useSubmitScreen';
// import ImageLabeling from '@react-native-ml-kit/image-labeling';
import { Header } from './Header';
import { Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useLatLng } from '../../state/LngLat';
import { SelectedImages } from '../../components/submit/SelectedImages';
import DropDown from 'react-native-paper-dropdown';

type Props = {
    navigation: StackNavigationProp<any>;
};

const TAG_LIST = [
    {
        label: '自然',
        value: '自然',
    },
    {
        label: '建物物',
        value: '建物物',
    },
    {
        label: '文化',
        value: '文化',
    },
    {
        label: '食べ物',
        value: '食べ物',
    },
    {
        label: '人物',
        value: '人物',
    },
    {
        label: '動物',
        value: '動物',
    },
    {
        label: 'その他',
        value: 'その他',
    },
];

export const SubmitScreen = ({ navigation }: Props) => {
    const {
        handlePhotoEditBtn,
        handleSubmitSnapPost,
        goBack,
        setTags,
        tags,
        control,
        selectedImages,
        isUploading,
        coordinate,
    } = useSubmitScreen();

    const [showDropDown, setShowDropDown] = useState(false);
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

            <TextInput
                label={'場所'}
                right={
                    <TextInput.Icon icon="map-marker" onPress={handleNavMap} />
                }
                value={`緯度:${coordinate?.latitude.toFixed(
                    6
                )} 経度:${coordinate?.longitude.toFixed(6)}`}
            />

            <DropDown
                label={'カテゴリ'}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={tags}
                setValue={setTags}
                list={TAG_LIST}
                multiSelect
                mode={'flat'}
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


            <View style={{ paddingTop: 48 }}>
                {/* HACK: 三項演算子が入れ子になって、可読性が悪い */}
                {isUploading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    selectedImages.length !== 0 && (
                        <ScrollView
                            contentContainerStyle={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <SelectedImages selectedImages={selectedImages} />
                        </ScrollView>
                    )
                )}
            </View>

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
