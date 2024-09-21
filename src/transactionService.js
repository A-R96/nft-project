import { rdt } from './radixConfig';

const COMPONENT_ADDRESS = 'component_tdx_2_1czaht2c3zpwx2aappaeu6nj8puy5u3mt6z802txf29a2j62r99vs9s';

class TransactionService {
  constructor() {
    this.rtmTemplate = '';
  }

  async loadRTMTemplate() {
    console.log('Loading RTM template...');
    try {
      // Corrected path to fetch the RTM template from the public directory
      const response = await fetch('/RTMs/buyNFT.rtm');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.rtmTemplate = await response.text();
      console.log('RTM template loaded successfully');
      console.log('RTM template content:', this.rtmTemplate);
    } catch (error) {
      console.error('Error loading RTM file:', error);
      throw error;
    }
  }

  generateRTM(accountAddress, amount, price) {
    console.log('Generating RTM with:', { accountAddress, amount, price });
    if (!this.rtmTemplate) {
      console.error('RTM template not loaded');
      throw new Error('RTM template not loaded');
    }

    const totalPrice = (parseFloat(price) * parseInt(amount)).toFixed(2);

    const rtm = this.rtmTemplate
      .replace(/\${accountAddress}/g, accountAddress)
      .replace(/\${componentAddress}/g, COMPONENT_ADDRESS)
      .replace(/\${totalPrice}/g, totalPrice)
      .replace(/\${amount}/g, amount);

    console.log('Generated RTM:', rtm);
    return rtm;
  }

  async sendTransaction(accountAddress, amount, price) {
    console.log('Sending transaction...');
    if (!this.rtmTemplate) {
      console.log('RTM template not loaded, loading now...');
      await this.loadRTMTemplate();
    }

    const rtm = this.generateRTM(accountAddress, amount, price);

    try {
      console.log('Calling rdt.walletApi.sendTransaction...');
      console.log('Transaction manifest:', rtm);
      const result = await rdt.walletApi.sendTransaction({
        transactionManifest: rtm,
        version: 1,
      });

      console.log('Transaction result:', result);

      if (result.isErr()) {
        console.error('Transaction error:', result.error);
        throw new Error(result.error.message || 'Transaction failed');
      }

      console.log('Transaction sent successfully:', result.value);
      return result.value;
    } catch (error) {
      console.error('Error sending transaction:', error);
      console.error('Error details:', error.message);
      throw error;
    }
  }
}

export const transactionService = new TransactionService();
