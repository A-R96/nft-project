import { rdt } from './radixConfig';

const COMPONENT_ADDRESS = 'component_tdx_2_1crkgyn5vtdc2j83n8tjmt2xp35tgx8ra5uh5eauqtm87fg7pvcvleh';

class TransactionService {
  constructor() {
    this.rtmTemplate = '';
  }

  async loadRTMTemplate() {
    console.log('Loading RTM template...');
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/RTMs/buyNFT.rtm`);
      this.rtmTemplate = await response.text();
      console.log('RTM template loaded successfully');
      console.log('RTM template content:', this.rtmTemplate);
    } catch (error) {
      console.error('Failed to load RTM template:', error);
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
    try {
      if (!this.rtmTemplate) {
        console.log('RTM template not loaded, loading now...');
        await this.loadRTMTemplate();
      }

      const rtm = this.generateRTM(accountAddress, amount, price);

      console.log('Calling rdt.walletApi.sendTransaction...');
      console.log('Transaction manifest:', rtm);
      const result = await rdt.walletApi.sendTransaction({
        transactionManifest: rtm,
        version: 1,
      });

      console.log('Transaction result:', result);

      if (result.isErr()) {
        console.log('Transaction error:', result.error);
        if (result.error.error === 'rejectedByUser') {
          throw new Error('Transaction rejected by user');
        } else {
          throw new Error('Transaction failed');
        }
      }

      console.log('Transaction sent successfully:', result.value);
      return result.value;
    } catch (error) {
      console.error('Error sending transaction:', error);
      console.error('Error details:', error.message);
      throw error; // Re-throw the error to be caught in SaleSection
    }
  }
}

export const transactionService = new TransactionService();