import { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'

const dAppId = 'account_tdx_2_128zd40ju66fndr232gj7ehsdk82y4xkkpm6eecamm4mf3rdn7n5akm'

export const rdt = RadixDappToolkit({
  dAppDefinitionAddress: dAppId,
  networkId: 2, // This is for Stokenet
  applicationName: 'CAPYCLUB',
  applicationVersion: '1.0.0',
})

console.log('RadixDappToolkit initialized:', rdt)

// Remove the DataRequestBuilder export
// export const dataRequestBuilder = DataRequestBuilder.create()

