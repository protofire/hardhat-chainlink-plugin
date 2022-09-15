import * as compose from "docker-compose";
import path from "path";

export const runNode = () =>
  compose.upAll({ cwd: path.join(__dirname), log: true })
    .then(() => console.log('Node running'), err => console.error(err))
