import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
import playlist from "./routes/playlists.route";
import tracks from "./routes/tracks.route";

app.use(cors());
app.use("/playlists", playlist);
app.use("/tracks", tracks);

app.listen(3000, () => {
  console.log("[URL]", "http://localhost:3000");
});
