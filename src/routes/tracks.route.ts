import { Request, Response, Router } from "express";
import client from "../client";

const route = Router();

route.get("/search/categories/:param", async (req: Request, res: Response) => {
  const { param } = req.params;

  try {
    const tracks = await client.tracks.searchTracks({
      query: param,
      limit: 100,
      offset: 0,
    });

    res.status(200).json({ tracks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Internal Server Error" });
  }
});
export default route;
