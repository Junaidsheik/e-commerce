import React from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import ReactDOM from 'react-dom';

const API_URL = 'http://localhost:4000';

const ITEMS = [
  {
    id: 1,
    price: ethers.utils.parseEther('1300'),
    image:
      'https://lh3.googleusercontent.com/sIz0dJep8p2nxEE4YJdqzSFcHJ46WrtcRlAREup_0fYyiq0OZgwwSGVjeqPVHuSWTqQUjWFx0rFDpdiLuAgjEG5FOWgHQ7JCTHuy',
  },
  {
    id: 2,
    price: ethers.utils.parseEther('2499'),
    image:
      'https://www.idwholesaler.com/media/catalog/product/c/a/canonidbundle2.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=300&width=300&canvas=300:300',
  },

  {
    id: 3,
    price: ethers.utils.parseEther('1769'),
    image: 'https://m.media-amazon.com/images/I/71RK6+rx-xL.jpg',
  },

  {
    id: 4,
    price: ethers.utils.parseEther('399'),
    image:
      'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$',
  },
];

function Store({ paymentProcessor, dai }) {
  const buy = async (item) => {
    const response1 = await axios.get(`${API_URL}/api/getPaymentId/${item.id}`);
    const tx1 = await dai.approve(paymentProcessor.address, item.price);
    await tx1.wait();

    const tx2 = await paymentProcessor.pay(
      item.price,
      response1.data.paymentId
    );
    await tx2.wait();

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response2 = await axios.get(
      `${API_URL}/api/getItemUrl/${response1.data.paymentId}`
    );
    console.log(response2.data);
  };
  return (
    <ul className='list-group'>
      <li className='list-group-item'>
        <div className='d-flex justify-content-between align-items-center'>
          <span>
            <img
              src={ITEMS[0].image}
              alt='Item 1'
              style={{ width: 150, height: 150 }}
            />
            <strong>
              Buy Samsung S23 Ultra -512 GB (Unlocked, US version)
            </strong>
          </span>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => buy(ITEMS[0])}
          >
            Buy 1300 DAI
          </button>
        </div>
      </li>

      <li className='list-group-item'>
        <div className='d-flex justify-content-between align-items-center'>
          <span>
            <img
              src={ITEMS[1].image}
              alt='Item 2'
              style={{ width: 150, height: 150 }}
            />
            <strong>
              Buy Canon EOS R5 Mirrorless Camera with RF 24-105mm f4L IS USM Kit
            </strong>
          </span>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => buy(ITEMS[1])}
          >
            Buy 2499 DAI
          </button>
        </div>
      </li>

      <li className='list-group-item'>
        <div className='d-flex justify-content-between align-items-center'>
          <span>
            <img
              src={ITEMS[2].image}
              alt='Item 3'
              style={{ width: 150, height: 150 }}
            />
            <strong>
              Buy ASUS ROG Strix Scar 15 (2022) Gaming Laptop, 15.6”
            </strong>
          </span>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => buy(ITEMS[1])}
          >
            Buy 1769 DAI
          </button>
        </div>
      </li>

      <li className='list-group-item'>
        <div className='d-flex justify-content-between align-items-center'>
          <span>
            <img
              src={ITEMS[3].image}
              alt='Item 4'
              style={{ width: 150, height: 150 }}
            />
            <strong>Buy Sony PlayStation 5 Digital Edition Console</strong>
          </span>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => buy(ITEMS[1])}
          >
            Buy 399 DAI
          </button>
        </div>
      </li>
    </ul>
  );
}

export default Store;
