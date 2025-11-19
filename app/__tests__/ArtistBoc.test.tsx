import React from "react";
import { render } from "@testing-library/react-native";
import ArtistBox from "../../components/ArtistBox";

describe("ArtistBox Component", () => {
  it("debe renderizar la imagen y el nombre del artista", () => {
    const artist = {
      id: "123",
      name: "Test Artist",
      image: "https://example.com/image.png",
    };

    const { getByText, getByTestId } = render(<ArtistBox artist={artist} />);

    expect(getByText("Test Artist")).toBeTruthy();

    const image = getByTestId("artist-image");
    expect(image.props.source.uri).toBe("https://example.com/image.png");
  });
});
