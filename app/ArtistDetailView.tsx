import ArtistBox from "@/components/ArtistBox";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Artist } from "@/types/artists";


const MainContainer = styled(View)`
    flex:1;
    align-items: center;
`;

export default function ArtistDetailView() {
    const params = useLocalSearchParams();

    const artist: Artist = {
        id: Number(params.id),
        name: String(params.name),
        image: String(params.image)
    };

    return (
        <MainContainer>
            <ArtistBox artist={artist} />
        </MainContainer>
    );
}