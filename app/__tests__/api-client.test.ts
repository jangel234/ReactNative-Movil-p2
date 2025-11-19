import { getMusicData } from "../api-client";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        topartists: {
          artist: [
            {
              mbid: "123",
              name: "Artist One",
              image: [{ "#text": "http://image.com/a1.png" }],
            },
            {
              mbid: "456",
              name: "Artist Two",
              image: [{ "#text": "http://image.com/a2.png" }],
            },
          ],
        },
      }),
  })
) as jest.Mock;

describe("getMusicData()", () => {
  it("debe retornar un arreglo de artistas convertido correctamente", async () => {
    const result = await getMusicData();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result.length).toBe(2);

    expect(result[0]).toEqual({
      id: "123",
      name: "Artist One",
      image: "http://image.com/a1.png",
    });

    expect(result[1]).toEqual({
      id: "456",
      name: "Artist Two",
      image: "http://image.com/a2.png",
    });
  });
});
