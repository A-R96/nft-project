import { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'

const dAppId = 'account_tdx_2_1289zm062j788dwrjefqkfgfeea5tkkdnh8htqhdrzdvjkql4krfwxt'

export const rdt = RadixDappToolkit({
  dAppDefinitionAddress: dAppId,
  networkId: 2, // This is for Stokenet
  applicationName: 'CAPYCLUB NFT',
  applicationVersion: '1.0.0',
})

console.log('RadixDappToolkit initialized:', rdt)

// Remove the DataRequestBuilder export
// export const dataRequestBuilder = DataRequestBuilder.create()

