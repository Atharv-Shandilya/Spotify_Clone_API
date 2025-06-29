import { Request, Response, Router } from "express";
import client from "../client";
import { GetTrendingPlaylistsTimeEnum, PlaylistArtwork } from "@audius/sdk";
const route = Router();

route.get("/trending", async (req: Request, res: Response) => {
  try {
    const trending = await client.playlists.getTrendingPlaylists({
      time: GetTrendingPlaylistsTimeEnum.Month,
    });
    res.status(200).json({ ...trending });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Internal Server Error" });
  }
});

route.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const playlistData = await client.playlists.getPlaylist({
      playlistId: id,
    });

    console.log(playlistData.data);

    const playlistTracks = await client.playlists.getPlaylistTracks({
      playlistId: id,
    });

    if (playlistData.data && playlistTracks.data) {
      const meta = playlistData.data[0];
      const tracks = playlistTracks.data;
      const playlist: {
        id: string;
        title: string;
        artwork: PlaylistArtwork | undefined;
        artist: string;
        totalTracks: number;
        playCount: number;
        tracks: any[];
      } = {
        id,
        title: meta.playlistName,
        artwork: meta.artwork,
        artist: meta.user.handle,
        totalTracks: meta.trackCount,
        playCount: meta.totalPlayCount,
        tracks: [],
      };

      for (let track of tracks) {
        playlist.tracks.push({
          trackId: track.id,
          title: track.title,
          artist: track.user.handle,
          artwork: track.artwork,
          duration: track.duration,
        });
      }
      res.status(200).json({ playlist });
    }

    res.status(404).json({ message: "Playlist is empty" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Internal Server Error" });
  }
});
export default route;
