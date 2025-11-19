import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ArtistBox from "../../components/ArtistBox";
import ArtistList from "../../components/ArtistList";
import ArtistDetailView from "../ArtistDetailView";
import { Artist } from "@/types/artists";

// Mock expo-router
jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("ArtistBox Component", () => {
  it("debe renderizar correctamente con los datos del artista", () => {
    const artist: Artist = {
      id: 123,
      name: "Test Artist",
      image: "https://example.com/image.png",
    };

    const { getByText, getByTestId } = render(<ArtistBox artist={artist} />);

    expect(getByText("Test Artist")).toBeTruthy();
    const image = getByTestId("artist-image");
    expect(image.props.source.uri).toBe("https://example.com/image.png");
  });

  it("debe mostrar diferentes nombres de artistas", () => {
    const artist: Artist = {
      id: 456,
      name: "Another Artist",
      image: "https://example.com/another.png",
    };

    const { getByText } = render(<ArtistBox artist={artist} />);

    expect(getByText("Another Artist")).toBeTruthy();
  });
});

describe("ArtistList Component", () => {
  it("debe renderizar una lista de artistas", () => {
    const artists: Artist[] = [
      { id: 1, name: "Artist A", image: "img1.png" },
      { id: 2, name: "Artist B", image: "img2.png" },
      { id: 3, name: "Artist C", image: "img3.png" },
    ];

    const { getByTestId } = render(<ArtistList artists={artists} />);

    expect(getByTestId("artist-box-Artist A")).toBeTruthy();
    expect(getByTestId("artist-box-Artist B")).toBeTruthy();
    expect(getByTestId("artist-box-Artist C")).toBeTruthy();
  });

  it("debe manejar lista vacía de artistas", () => {
    const artists: Artist[] = [];

    const { queryByTestId } = render(<ArtistList artists={artists} />);

    expect(queryByTestId("artist-box-Artist A")).toBeFalsy();
  });

  it("debe navegar cuando se presiona un artista", () => {
    const mockUseRouter = jest.requireMock("expo-router").useRouter as jest.Mock;
    const mockPush = jest.fn();
    mockUseRouter.mockReturnValue({ push: mockPush });

    const artists: Artist[] = [
      { id: 1, name: "Artist A", image: "img1.png" },
    ];

    const { getByTestId } = render(<ArtistList artists={artists} />);
    const artistBox = getByTestId("artist-box-Artist A");

    fireEvent.press(artistBox);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "./ArtistDetailView",
      params: { id: 1, name: "Artist A", image: "img1.png" },
    });
  });

  it("debe renderizar múltiples artistas correctamente", () => {
    const artists: Artist[] = [
      { id: 1, name: "Artist One", image: "img1.png" },
      { id: 2, name: "Artist Two", image: "img2.png" },
      { id: 3, name: "Artist Three", image: "img3.png" },
      { id: 4, name: "Artist Four", image: "img4.png" },
    ];

    const { getByTestId } = render(<ArtistList artists={artists} />);

    expect(getByTestId("artist-box-Artist One")).toBeTruthy();
    expect(getByTestId("artist-box-Artist Two")).toBeTruthy();
    expect(getByTestId("artist-box-Artist Three")).toBeTruthy();
    expect(getByTestId("artist-box-Artist Four")).toBeTruthy();
  });
});

describe("ArtistDetailView Component", () => {
  it("debe renderizar sin errores", () => {
    const { root } = render(<ArtistDetailView />);
    expect(root).toBeTruthy();
  });

  it("debe renderizar un View vacío", () => {
    const { root } = render(<ArtistDetailView />);
    expect(root).toBeTruthy();
  });

  it("debe tener un componente View como elemento principal", () => {
    const { root } = render(<ArtistDetailView />);
    expect(root.type).toBe("View");
  });
});
