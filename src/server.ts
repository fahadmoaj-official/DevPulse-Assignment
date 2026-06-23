import app from './app';
import {env} from './config/env';
import { interactWithDB } from "./db/index";

interactWithDB().catch((err) => {
  console.error("Failed to connect to database", err);
  process.exit(1);
});


if (env.NODE_ENV !== 'production') {
  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on port ${env.PORT} http://localhost:${env.PORT}`);
  });
}


export default app;
