import React, { useState } from "react";
import { FlatList, Image, Text, View,StyleSheet, TouchableOpacity } from "react-native";
import { SnapPost } from "../../entities/SnapPost";
import { SCREEN_WIDTH } from "../../constants/ScreenSize";

type Props={
    snapPost:SnapPost;
}
export const SwipeCard = (props:Props) => {
    const { snapPost} = props;
    const [selectedImage,setSelectedImage] = useState<string>(snapPost.postImages[0].imagePath);
    
    const handlePressImage = (imagePath:string) => {
        setSelectedImage(imagePath);
    }

    const isImageActive = (imagePath:string) => {
        return selectedImage === imagePath;
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{snapPost.title}</Text>
            <Text style={styles.link}>Googleマップで表示</Text>
            <FlatList
                data={snapPost.postImages}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.imageContainer}
                        onPress={() => handlePressImage(item.imagePath)}
                    >
                        <Image
                            source={{ uri: item.imagePath }}
                            style={isImageActive(item.imagePath) ? {...styles.image,opacity:0.5} : {...styles.image}}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(_, index) => index.toString()}
                style={styles.listContainer}
                horizontal={true}
            />
            <Image 
                source={{uri:selectedImage}}
                style={styles.selectedImage}
            />
            <Text style={styles.comment}>{snapPost.comment}</Text>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 20,
        MaxWidth: SCREEN_WIDTH-20,
        width: SCREEN_WIDTH-20,
    },
    title: {
        fontSize: 25,
        marginBottom: 5,
    },
    link: {
        color: '#0A85FF',
        marginBottom: 10,
    },
    selectedImage: {
        maxWidth:SCREEN_WIDTH-40,
        height:SCREEN_WIDTH-40,
        objectFit: 'cover',
        borderRadius: 15,
        marginBottom: 10,
    },
    imageContainer: {
        marginRight: 10,
    },
    listContainer: {
        marginBottom: 10,
        display: 'flex',
    },
    image: {
        width: 60, 
        height: 60,
        borderRadius: 10,
        objectFit: 'cover',
    },
    comment:{
        marginBottom: 10,
        fontSize: 17,
    },
});