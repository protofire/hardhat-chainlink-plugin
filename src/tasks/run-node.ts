import * as compose from 'docker-compose'
import { join } from 'path'

export const runNode = async (): Promise<void> => {
  try {
    await compose.down({ cwd: join(__dirname), log: true })
    await compose.upAll({ cwd: join(__dirname), log: true })
    console.log('Node running')
  } catch (e) {
    console.log('Encountered errors when trying to run node')
    console.error(e)
  }
}
