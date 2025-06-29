import { sdk } from "@audius/sdk";

export default sdk({
  apiKey: process.env.API_KEY as string,
  apiSecret: process.env.API_SECRET as string,
});
