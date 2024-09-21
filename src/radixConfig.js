import { RadixDappToolkit, DataRequestBuilder } from '@radixdlt/radix-dapp-toolkit'

const dAppId = 'account_tdx_2_128647u9lhk06k8lc73sfcjchp7ynz5y9xfpee9lnagyay432curpdd'

export const rdt = RadixDappToolkit({
  dAppDefinitionAddress: dAppId,
  networkId: 2, // This is for Stokenet
  applicationName: 'CAPYCLUB',
  applicationVersion: '1.0.0',
})

console.log('RadixDappToolkit initialized:', rdt)

export const getRdt = () => rdt

export { DataRequestBuilder }



