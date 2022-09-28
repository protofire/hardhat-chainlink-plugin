import * as compose from "docker-compose";
import { join } from "path";

export const runNode = () =>
  compose.upAll({ cwd: join(__dirname), log: true })
    .then(() => console.log('Node running'), err => console.error(err))
