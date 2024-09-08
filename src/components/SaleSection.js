import React, { useState } from 'react';

function SaleSection() {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value > 10 ? 10 : value < 1 ? 1 : value);
  };

  const handleBuy = () => {
    // Implement buy functionality here
    console.log(`Buying ${quantity} NFTs`);
  };

  return (
    <section id="sale">
      <h2>Buy NFTs</h2>
      <div>
        <label htmlFor="quantity">Quantity (max 10):</label>
        <input
          type="number"
          id="quantity"
          min="1"
          max="10"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>
      <button onClick={handleBuy}>Buy Now</button>
    </section>
  );
}

export default SaleSection;