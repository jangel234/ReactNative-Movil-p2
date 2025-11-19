import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Home from "../home";
import { getMusicData } from "../api-client";

jest.mock("../api-client");

describe("Home Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe mostrar la lista de artistas después del fetch", async () => {
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
});
