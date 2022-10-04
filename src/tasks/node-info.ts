import { ActionType } from 'hardhat/types'
import { login } from '../helpers/login'
import axios from 'axios'

declare interface ResponseData {
  data: {
    ethKeys: {
      results: Array<{
        address: string
        ethBalance: string
        chain: {
          id: string
        }
      }>
    }
  }
}

const getInfo = async (authToken: string): Promise<ResponseData> => {
  const response = await axios.request({
    url: 'http://127.0.0.1:6688/query',
    headers: {
      'content-type': 'application/json',
      cookie: `blocalauth=localapibe315fd0c14b5e47:; isNotIncognito=true; _ga=GA1.1.2055974768.1644792885; ${authToken}`,
      Referer: 'http://127.0.0.1:6688/jobs/new'
    },
    data: '{"operationName":"FetchAccountBalances","variables":{},"query":"fragment AccountBalancesPayload_ResultsFields on EthKey {\\n  address\\n  chain {\\n    id\\n    __typename\\n  }\\n  ethBalance\\n  isFunding\\n  linkBalance\\n  __typename\\n}\\n\\nquery FetchAccountBalances {\\n  ethKeys {\\n    results {\\n      ...AccountBalancesPayload_ResultsFields\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}',
    method: 'POST'
  })

  return response.data
}

export const nodeInfo: ActionType<{ email: string, pass: string }> = async (
  taskArgs
) => {
  const { email, pass } = taskArgs

  const authenticationToken = await login(email.trim(), pass.trim())

  try {
    const info = await getInfo(authenticationToken)
    
    console.table({
      Address: info.data?.ethKeys?.results[0]?.address,
      Balance: info.data?.ethKeys?.results[0]?.ethBalance,
      ChainID: info.data?.ethKeys?.results[0]?.chain?.id
    })
  } catch (error) {
    console.log('Could not get Node address reason: ', error)
  }
}
