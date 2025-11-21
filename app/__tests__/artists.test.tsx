import React from "react";
import { fireEvent, render, waitFor, screen } from "@testing-library/react-native";
import { Artist } from "@/types/artists";

// Ajusta estas rutas según tu estructura real de carpetas
import ArtistBox from "../../components/ArtistBox";
import ArtistList from "../../components/ArtistList";
import ArtistDetailView from "../ArtistDetailView";
import Home from "../home";

import { getMusicData } from "../api-client";
import { useLocalSearchParams } from "expo-router";

// ==================== MOCKS GLOBALES ====================

// 1. Mock unificado de expo-router (Maneja useRouter y useLocalSearchParams a la vez)
const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
  useLocalSearchParams: jest.fn(),
}));

// 2. Mock de api-client
jest.mock("../api-client");


// ==================== HOME TESTS ====================
describe("Home Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("HOME TEST 1: debe mostrar la lista de artistas después del fetch", async () => {
    (getMusicData as jest.Mock).mockResolvedValue([
      { id: "1", name: "Artist A", image: "img1" },
      { id: "2", name: "Artist B", image: "img2" },
    ]);

    const { getByTestId } = render(<Home />);

    await waitFor(() => {
      expect(getByTestId("artist-box-Artist A")).toBeTruthy();
      expect(getByTestId("artist-box-Artist B")).toBeTruthy();
    }, { timeout: 3000 });
  });

  it("HOME TEST 2: debe llamar a getMusicData al montarse", async () => {
    (getMusicData as jest.Mock).mockResolvedValue([
      { id: "1", name: "Artist A", image: "img1" },
    ]);

    render(<Home />);

    await waitFor(() => {
      expect(getMusicData).toHaveBeenCalled();
    });
  });

  it("HOME TEST 3: debe renderizar ArtistList con artistas obtenidos", async () => {
    const mockArtists = [
      { id: "1", name: "Test Artist 1", image: "img1" },
      { id: "2", name: "Test Artist 2", image: "img2" },
    ];

    (getMusicData as jest.Mock).mockResolvedValue(mockArtists);

    const { getByTestId } = render(<Home />);

    await waitFor(() => {
      expect(getByTestId("artist-box-Test Artist 1")).toBeTruthy();
      expect(getByTestId("artist-box-Test Artist 2")).toBeTruthy();
    }, { timeout: 3000 });
  });
});

// ==================== ARTISTBOX TESTS ====================
describe("ArtistBox Component", () => {
  it("ARTISTBOX TEST 1: debe renderizar correctamente con los datos del artista", () => {
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

  it("ARTISTBOX TEST 2: debe mostrar diferentes nombres de artistas", () => {
    const artist: Artist = {
      id: 456,
      name: "Another Artist",
      image: "https://example.com/another.png",
    };

    const { getByText } = render(<ArtistBox artist={artist} />);

    expect(getByText("Another Artist")).toBeTruthy();
  });

  it("ARTISTBOX TEST 3: debe renderizar con propiedades correctas de imagen", () => {
    const artist: Artist = {
      id: 789,
      name: "Third Artist",
      image: "https://example.com/third.png",
    };

    const { getByTestId } = render(<ArtistBox artist={artist} />);

    const image = getByTestId("artist-image");
    expect(image.props.source).toEqual({ uri: "https://example.com/third.png" });
  });
});

// ==================== ARTISTLIST TESTS ====================
describe("ArtistList Component", () => {
  it("ARTISTLIST TEST 1: debe renderizar una lista de artistas", () => {
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

  it("ARTISTLIST TEST 2: debe manejar lista vacía de artistas", () => {
    const artists: Artist[] = [];

    const { queryByTestId } = render(<ArtistList artists={artists} />);

    expect(queryByTestId("artist-box-Artist A")).toBeFalsy();
  });

  it("ARTISTLIST TEST 3: debe navegar cuando se presiona un artista", () => {
    // No necesitamos mockear useRouter aquí, ya lo hicimos globalmente arriba
    
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
});

// ==================== ARTISTDETAILVIEW TESTS ====================
describe("ArtistDetailView Component", () => {
  
  beforeEach(() => {
    // Configuramos el mock para este suite específico
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      id: "1",
      name: "Bad Bunny",
      image: "https://example.com/image.png",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("ARTISTDETAILVIEW TEST 1: debe renderizar sin errores", () => {
    const component = render(<ArtistDetailView />);
    expect(component).toBeTruthy();
  });

  it("ARTISTDETAILVIEW TEST 2: debe mostrar el nombre del artista (Integración con ArtistBox)", () => {
    const { getByText } = render(<ArtistDetailView />);
    // Como NO mockeamos ArtistBox, podemos buscar el texto real que renderiza
    expect(getByText("Bad Bunny")).toBeTruthy();
  });

  it("ARTISTDETAILVIEW TEST 3: debe pasar la imagen correcta al componente hijo", () => {
    const { getByTestId } = render(<ArtistDetailView />);
    
    // Verificamos que la imagen dentro de ArtistBox tenga la URI correcta
    const image = getByTestId("artist-image");
    expect(image.props.source.uri).toBe("https://example.com/image.png");
  });
});