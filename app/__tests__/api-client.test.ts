import { getMusicData } from "../api-client";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        topartists: {
          artist: [
            {
              mbid: "25f3abd9-63b5-471a-bd25-feb9672dfa11",
              name: "ROSALÍA",
              listeners: "18463",
              image: [
                { "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png", "size": "small" },
                { "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png", "size": "medium" },
                { "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png", "size": "large" },
                { "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png", "size": "extralarge" },
              ],
            },
            {
              mbid: "89aa5ecb-59ad-46f5-b3eb-2d424e941f19",
              name: "Bad Bunny",
              listeners: "11114",
              image: [
                { "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png", "size": "small" },
                { "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png", "size": "medium" },
                { "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png", "size": "large" },
              ],
            },
            {
              mbid: "20244d07-534f-4eff-b4d4-930878889970",
              name: "Taylor Swift",
              listeners: "9354",
              image: [
                { "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png", "size": "small" },
                { "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png", "size": "medium" },
                { "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png", "size": "large" },
              ],
            },
          ],
        },
      }),
  })
) as jest.Mock;

describe("getMusicData()", () => {
  it("API-CLIENT TEST 1: debe retornar un arreglo de artistas convertido correctamente", async () => {
    const result = await getMusicData();

    expect(result.length).toBe(3);
    expect(result[0]).toEqual({
      id: "25f3abd9-63b5-471a-bd25-feb9672dfa11",
      name: "ROSALÍA",
      image: "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
    });
    expect(result[1]).toEqual({
      id: "89aa5ecb-59ad-46f5-b3eb-2d424e941f19",
      name: "Bad Bunny",
      image: "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
    });
    expect(result[2]).toEqual({
      id: "20244d07-534f-4eff-b4d4-930878889970",
      name: "Taylor Swift",
      image: "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
    });
  });

  it("API-CLIENT TEST 2: debe hacer una llamada fetch a la API correctamente", async () => {
    await getMusicData();

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(
      "https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=a0b7538025b8a38c70ce8dd816798f6b&format=json",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      })
    );
  });

  it("API-CLIENT TEST 3: debe extraer correctamente la primera imagen del arreglo de imágenes", async () => {
    const result = await getMusicData();

    expect(result[0].image).toBe("https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png");
    expect(result[1].image).toBe("https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png");
    expect(result[2].image).toBe("https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png");
    
    result.forEach((artist: any) => {
      expect(artist).toHaveProperty("id");
      expect(artist).toHaveProperty("name");
      expect(artist).toHaveProperty("image");
    });
  });
});
