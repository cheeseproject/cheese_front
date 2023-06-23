import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SubmitCard } from '../../components/myPage/SubmitCard';
import { useMyPageScreen } from './useMaPageScreen';
import { SnapPost } from '../../entities/SnapPost';
import { ScreenLoader } from '../../components/common/ScreenLoader';
import { Appbar, Avatar, Button, Text, ToggleButton } from 'react-native-paper';
import { useFetchMyUser } from '../../hooks/domain/user/useFetchUser';

export const MyPageScreen = () => {
    const { mySnapPosts, likedSnapPosts } = useMyPageScreen();

    const { data: myUser } = useFetchMyUser();
    // 現在選択中のボタンの値を管理する
    const [selectedButton, setSelectedButton] = useState<string>('post');
    const isActive = (value: string) => value === selectedButton;

    const renderSubmitCard = (snapPost: SnapPost) => (
        <View style={{ flex: 0.5 }}>
            <SubmitCard
                title={snapPost.title}
                comment={snapPost.comment}
                tags={snapPost.tags}
                imagePath={snapPost.postImages[0].imagePath}
            />
        </View>
    );

    if (!mySnapPosts) {
        return <ScreenLoader />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Content title="マイページ" />
            </Appbar.Header>
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
                        onValueChange={(value) => setSelectedButton(value)}
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
                    maxHeight: 270,
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 40,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    container: {
        backgroundColor: '#fff',
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
