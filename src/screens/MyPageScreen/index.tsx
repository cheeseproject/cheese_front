import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMyPageScreen } from './useMaPageScreen';
import { SnapPost } from '../../entities/SnapPost';
import { ScreenLoader } from '../../components/common/ScreenLoader';
import { Appbar, Avatar, Button, Text, ToggleButton } from 'react-native-paper';
import { useFetchMyUser } from '../../hooks/domain/user/useFetchUser';
import { SubmitCard } from '../../components/myPage/SubmitCard';

export const MyPageScreen = () => {
    const {
        mySnapPosts,
        likedSnapPosts,
        isLoading,
        myUser,
        handlePressSnapPost,
        handleChangeSelectedButton,
        selectedButton,
        isActive,
    } = useMyPageScreen();

    const renderSubmitCard = (snapPost: SnapPost) => (
        <View style={{ flex: 0.5, margin: 4 }}>
            <SubmitCard
                title={snapPost.title}
                comment={snapPost.comment}
                tags={snapPost.tags}
                imagePath={snapPost.postImages?.[0]?.imagePath}
                onPress={() => handlePressSnapPost(snapPost.snapPostId)}
            />
        </View>
    );

    if (isLoading) {
        return <ScreenLoader />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileInfo}>
                <Avatar.Image
                    size={75}
                    source={
                        myUser?.iconPath
                            ? { uri: myUser.iconPath }
                            : require('../../assets/profile/default.png')
                    }
                />
                <Text style={styles.userName}>
                    {myUser?.name ? '@' + myUser.name : 'Noname'}
                </Text>
                <Button style={styles.edit}>プロフィール編集・設定</Button>
                <View>
                    <ToggleButton.Row
                        value={selectedButton}
                        onValueChange={handleChangeSelectedButton}
                        style={styles.toggleButtons}
                    >
                        <ToggleButton
                            icon={require('../../assets/profile/post.png')}
                            iconColor={isActive('post') ? 'white' : '#222'}
                            value="post"
                            style={
                                isActive('post')
                                    ? styles.checkedBtn
                                    : styles.uncheckedBtn
                            }
                        />
                        <ToggleButton
                            icon={require('../../assets/profile/like.png')}
                            iconColor={isActive('like') ? 'white' : '#222'}
                            value="like"
                            style={
                                isActive('like')
                                    ? styles.checkedBtn
                                    : styles.uncheckedBtn
                            }
                        />
                    </ToggleButton.Row>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    overflow: 'scroll',
                    backgroundColor: '#f0f0f0',
                }}
            >
                <FlatList
                    data={isActive('post') ? mySnapPosts : likedSnapPosts}
                    renderItem={({ item }) => renderSubmitCard(item)}
                    keyExtractor={(item) => item.snapPostId}
                    numColumns={2}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingBottom: 480,
        // HACK: これを入れないと、FlatListの中身が表示されない.他にいい方法があれば変更する
    },
    checkedBtn: {
        border: 'none',
        width: '50%',
        borderWidth: 0,
        backgroundColor: '#222',
    },
    uncheckedBtn: {
        border: 'none',
        width: '50%',
        borderWidth: 0,
        backgroundColor: '#fff',
    },
    toggleButtons: {
        marginBottom: 10,
    },
    profileInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
    },
    userName: {
        fontSize: 20,
        margin: 10,
    },
    edit: {
        fontSize: 20,
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
    },
});
