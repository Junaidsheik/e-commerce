import React, { useState, useEffect } from 'react';
import getBlockchain from './ethereum';
import Store from './Store.js';

function App() {
  const [paymentProcessor, setPaymentProcessor] = useState(undefined);
  const [dai, setDai] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { paymentProcessor, dai } = await getBlockchain();
      setPaymentProcessor(paymentProcessor);
      setDai(dai);
    };
    init();
  }, []);

  if (typeof window.ethereum === 'undefined') {
    return (
      <div className='container'>
        <div className='col-sm-12'>
          <h1> UNT EAGLE PAY</h1>
          <p>You need to install the 8.0.1 version of MetaMask Wallet</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1> UNT EAGLE PAY</h1>
      <h3>A Crypto Payment Gateway</h3>
      <Store paymentProcessor={paymentProcessor} dai={dai} />
    </div>
  );
}

export default App;
