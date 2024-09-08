import React from 'react';

const ImageBanner = () => {
  const imageUrls = [
    "https://arweave.net/oqktzR2ZwNudfGgiHEXCJC92zph9zbOF4yvmdr-HJK0",
    "https://arweave.net/0yy99sljhxbDynyLTQxfUZ5St8BAmFqxwhvJL0nQK9Q",
    "https://arweave.net/MLyssALSubSsCCf6Wnm5-JfnmYB_YHadhUvtY2gN5p8",
    "https://arweave.net/wFdN4srD9dOPXLZ_-sajQl6Qk1pN2BIPpkgV5adj8sc",
    "https://arweave.net/InbCQLuypq8EHP21fe389PNqVd7OyEM8uw7KXMuz30o",
    "https://arweave.net/1ElYoEvaN3DLjWq3zty0lEZgaTXF30L71ipg_QM3tlU",
    "https://arweave.net/Vkf5DAs6l-H4D2PXK0kB_w6hBQw3UbaspotONm8dTpo",
    "https://arweave.net/T07aCGDdUh030VLsI7Hc0KGDne7CK63NJR5LJvzWxgI",
    "https://arweave.net/QZ1mpVpaacyVc6KV9wB25TKMW43fY3pUR-cIab5E7nM",
    "https://arweave.net/zMTLpgmAPISqSg8sfmBsT7-gBoR4tuXYh-9QvU1f_eE",
    "https://arweave.net/3V6762A10qG4y8HM0zS3pyYeTNxt4GdEH0nvh0TNsDI",
    "https://arweave.net/J8EJQz5qZT6Px22UvhGzJEKjzbpgxjWXRdrMjAUf6Y4",
    "https://arweave.net/rah8nUvC9w-2Is1O_iVR8Qipc99jF7xecB1pe8t9S6E",
    "https://arweave.net/Ir0A-dgxtBvLHi17DUEJKK6dl1p0Zb3Dy2o8bWJ55X4",
    "https://arweave.net/bIQeEozAdryTIn_kPThPHt-OD2G0uVMmaAJ6plW3StE",
    "https://arweave.net/V9Kyqa81Z7-6Iw9VjasVvQBX1aT4vmwnsOPw36L9mwI",
    "https://arweave.net/OB5dQxDRwluF0AWoP_0G_poQOmkkjZMWO9IS4GmFn94",
    "https://arweave.net/oBI72ICJ51HknceI0UjdYla8r8JPMkYw-6ywhNJAeUo",
    "https://arweave.net/tyq8SOs1b1cFZpDsRLcqYLo5MNfi1-i57Mc4guK7gSg",
    "https://arweave.net/VGk5lI6LmNWJqpBj-7zm5xl7D07j1PSdbhR5wf-YDvo",
    "https://arweave.net/D-LdRqU8TJBQJAQiurqAO1ChP1NMK_o_uoOthKu7Fsc",
    "https://arweave.net/ZlpT-8bLYRPna562Qu1FFl46AfCGxaV5E4-wWjnxTdo",
    "https://arweave.net/pEiqhVM9CPl32GSnzkcfHiqMJKlOxn4wwqKkyFiOXqw",
    "https://arweave.net/PhHyIMaCsbFIL0bDM_f9SNLz58-gcjP032lH4mjuYQw",
    "https://arweave.net/XLlKsyfXVVz8jGvomEKlUifzg3ZlY3rndfqQhvPZ9fY",
    "https://arweave.net/nGsVJ0nuQfrAFr8i1g22Z1T97P5NSEKODj0cGNU2nRI",
    "https://arweave.net/qaHKIkzaZZV3Kdvz5iXzKvXRtgiCvAaGmGGCg7iumUU",
    "https://arweave.net/v42wOT1RYsCLPCEnlA5Z_1l4fCLP7UiasY7Egn4HTYE",
    "https://arweave.net/axKukKaKH6MwP0UJcBM4J3at5Y2nL_-PjFRkBeItiU0",
    "https://arweave.net/qwgmnOn-Vjy8bJbFGcdis5n2K9TWBDwBdRFFUGU8974",
    "https://arweave.net/W7qiV73-Jh9vsV1OK9Wm5kMHsxAoyEwFyDD7Iwuj0Sk",
    "https://arweave.net/aSwjNayu3OjZPdxTAoO4vOf9cwm-OvWPd00dROAVZgk",
    "https://arweave.net/hOBL4IbdXR8HZqLJs2LQAL0dxhDClzBnyIvuZeXTtQA",
    "https://arweave.net/pL4c6fEVNjUJpdZAY-sLJYos0ykqhRUwg2Hbe5kIxY4",
    "https://arweave.net/lKY0oVE-9H4WCNVrYQjYzey3dFaS2nek4yPAPZ2O9nA",
    "https://arweave.net/sAx8djdbvoUf0wkYtB683Zsb3aKh7MG--v_CHybqU44",
    "https://arweave.net/NROJTz47PvXIxLvUT0ISkrydqFuTWavgAQRAohbK73Y",
    "https://arweave.net/avN0n5fRoUrhfo8OeTZGzDipJEwNTViQDMv_LBf12fM",
    "https://arweave.net/Gdr25yMqY6NtoNRmc--Xdzbz5p5LA0N_8df2DFUSZw4",
    "https://arweave.net/XTENrf0bWxDljvFDySrETsfTreQ07DUwhgRR4FNS-ZQ",
    "https://arweave.net/m8dFFeSWgxOz_A3-TIYiA6ns-MGduEulkFpCKx9aJQo",
    "https://arweave.net/WHCogwuuLChduOAjgSs0-onFmCZtxqdDbR3m5QWlKA4",
    "https://arweave.net/fRwAKZ4E4aY2E3lvRefuXJU5sNZ8QCwp-p0zt1sYv6s",
    "https://arweave.net/-AKFbI9GYECfKhm_jGJw5Lr-WTkWu1M8KUaJJ549A3k",
    "https://arweave.net/W4HaSySyZXAaLoCVR-mxnf7RlxHX3X10XRP9yeHooVI",
    "https://arweave.net/K5glqIHML0GnansuSRLNRvBGUXeKB7wLaC8rvWvWnyU",
    "https://arweave.net/ygxEICfzI98Tiht5-5uWlttPtSmdgTTdovLfCUJc39g",
    "https://arweave.net/f1rZIWpviE_RUYqdPeBaJCmgUuDm2aMnKnW76eU-XnA",
    "https://arweave.net/J5w8xhlWYSqggqQlUPPOHfwqdF9RcNKB25WoKMAfIIk",
    "https://arweave.net/syvoYcsbQOLko-Uvf-TGjTX8cio0qr4wJ0gM9AAnHbM",
    "https://arweave.net/krH89HslqA262HKJm4uvw3YbnVV0yoofB6cSuZiY47c"
  ];

  return (
    <div className="image-banner">
      <div className="image-container">
        {imageUrls.concat(imageUrls).map((url, index) => (
          <img key={index} src={url} alt={`Banner item ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default ImageBanner;