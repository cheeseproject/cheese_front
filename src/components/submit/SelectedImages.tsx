import React from "react";
import { View,Image, FlatList } from "react-native";
import { UploadFileResult } from "../../hooks/storage/useUploadFile";

type Props = {
    selectedImages:UploadFileResult[];
}
export const SelectedImages = (props:Props) => {
    
    const {selectedImages} = props;

    const SelectedImage = (selectedImage:UploadFileResult) => (
        <Image 
            source={{uri:selectedImage.fileUrl}}
            style={{ width: 200, height: 200 }}
        />
    )   

    return (
        <FlatList
                    data={selectedImages}
                    renderItem={({ item }) => SelectedImage(item)}
                    keyExtractor={( item ) => item.fileUrl}
                    numColumns={2}
                />
    )
};