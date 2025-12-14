import config from "./config/config.js";
import app from "./index.js";

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
