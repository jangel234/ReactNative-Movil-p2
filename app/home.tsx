import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { getMusicData } from './api-client';
import ArtistList from '../components/ArtistList';
import { Artist } from "@/types/artists";

const MainContainer = styled(View)`
  flex: 1;
  background-color: #fff;
`;

export default function Home() {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    getMusicData().then(data => setArtists(data));
  }, []);

  return (
    <MainContainer>
      {artists && <ArtistList artists={artists} />}
    </MainContainer>
  );
}