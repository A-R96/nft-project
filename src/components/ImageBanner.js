import React from 'react';

const ImageBanner = () => {
  const imageUrls = [
    "https://arweave.net/XHlXntlg9vlr8oGzbq2-vbrf3boEd9KydkLIyyx8tw4",
    "https://arweave.net/7IakfF-t-kUaCZqwFcq1kr1fMcnxYYY2yuBxQDyXqOk",
    "https://arweave.net/IubR5-g2jpiTPebmBWgNX06rK29nz86OmjyUWkRP4uw",
    "https://arweave.net/03EUKxysaURFKlILhUrNcRAsP7LgC7xsWqc8hAASv7M",
    "https://arweave.net/U9jgX0K7Vu-SoXZVV_9MlfyFZXM-_dGVfnzgUZbHIuw",
    "https://arweave.net/-EHX-bfSx9eJONzopXLj55yB6cJFpu8gzKN6QAgF73A",
    "https://arweave.net/_r3LszjQ44f0JSDR5qd9RERR7x10wDKpwZZGCuxtDXc",
    "https://arweave.net/aXc2TQveIcO4k13291_2udZ5LspAJoywsAQOj4BiFxc",
    "https://arweave.net/2mjDO_Jv6esrdnCD4NR9OKq6nK0BcboDKC63rqw4GK4",
    "https://arweave.net/YrVeE52DH93vGWbPhd0I_Yjg-DT26FEIfbv_qarHnkY",
    "https://arweave.net/54wEoKS2Wwb_LWK1RWBOtTNpuuN2ki9gOnyditF-hv0",
    "https://arweave.net/YED1FjvMNpoBEkzcZzuGT_dpNJzFYyUPEGqteR08ZPk",
    "https://arweave.net/HmhKV25ArWZz0zqtdlhs42yVL1lqYpcy-9_fqQKr86Q",
    "https://arweave.net/ifwhk1HCoQfAC9MZkNhNAleewde23hB54Ck3fQZw1OA",
    "https://arweave.net/RmlCTFi7D0-WZHqDn4Cz8pv_AhkXhwfdwSbfkiVJphg",
    "https://arweave.net/Lmcvif_f-Abo5YmS1zEc6jTS-ch0SoJfXbUvHYKnjDU",
    "https://arweave.net/aekATvsy8cmpYrqCoZ40WY4c1FBLuk6eMLrfu29Ak74",
    "https://arweave.net/Fk4_-kuoKn9pE5sN858JpIPSobNh3nMQH2448eixbMc",
    "https://arweave.net/EFHLR9O8-eDWZ98RR2bl7u26WSx5LLC1ZuFNIFgfXWs",
    "https://arweave.net/VYOtvAaJ6_cQ14Fc3HXDgxBZonoMD1JSd352pZKfep8",
    "https://arweave.net/yhpb1Xl1CLWAd8htc1IncuLOI683mOPAsyIEgqOcQJU",
    "https://arweave.net/GW5TMzZhhepNrvhglHhaaaS0gBVd7uC5ITC8C-xOn-0",
    "https://arweave.net/pbGshsaBJflzOAfWLlYgJ9xUTOfjCTcLmSjDhxtZd9Q",
    "https://arweave.net/hpXI05W0CE6XB8fMPe9ru3bbu5X6wDbX3HhD_UI4c1s",
    "https://arweave.net/epCrGqg9jzjWTcR56BLfeSEago_ujkYTsvm4YEDZcJI",
    "https://arweave.net/8AdGfaJ06X5iww_mPfPlgtJQErXF57eXXyCf-P_y5f0",
    "https://arweave.net/njX_X3TGElZlylADfzME5eq4uK0VxdmGlyN6DcWpf8g",
    "https://arweave.net/054nOmhdcG5C9m-qaI9dVZyHrDjkQYWbEyYQYP2CgZc",
    "https://arweave.net/WZwuOC9UHbqCs4nUL_lueillDlWVyYhhacjbxJ9swFo",
    "https://arweave.net/pAJle7CWWzIVI8K04eeMkk2xGFaz8Fy3ZRqARX4WcoY",
    "https://arweave.net/SXcf_n-3Hq_pv2W8_OUz-2KHoEX1TV_vLWxq72P7cag",
    "https://arweave.net/Jsaxho_fbJHSVS99t8SYDhmwFiqCJbwaw_M9nL8f0Wg",
    "https://arweave.net/hGjdG1mS63voap5H5QMWUfqXWYkqOW4E4PGsREFPBYM",
    "https://arweave.net/LO-Rmw3mVogzqyKgp5xJC6C-8HOdpgmVbQuyNny3JeQ",
    "https://arweave.net/Ku1IpOToQxrpwj7u20wojK_yTACl5d82awvPYp_o_MM",
    "https://arweave.net/WwXmJk_dZjFmZlkpNuxMyVwT65gp-gYHIcNJczWMhxA",
    "https://arweave.net/OOVeM8lc7v29OuvTz2EDVmULoiQA4YHog76WW0oj3HA",
    "https://arweave.net/c-FcNm6mxYe5u2-UW9ttrQ5OdP2iGp-0MFcYIZJPD5A",
    "https://arweave.net/hwTRz4uMQq4yZaEhsfzngnk-qsvfRqL2F3nhKZpNZwQ",
    "https://arweave.net/YsdKaIFV-JdGrRtfpdKB52kd9SplP87YvLHQsPmf5N4",
    "https://arweave.net/aBrCWmrKA4atnZhRJhgej_Ll2hopRdL1mP12_wCEqgU",
    "https://arweave.net/-MTye2394jUIlO9bUSLoasbNi07UIxasuAvTFg8sJmA",
    "https://arweave.net/9BgsDeQ6Ww10fHu8pKMyN0JXHuMiue_vt8Y7hs7ulZc",
    "https://arweave.net/3s1JLxVCby0CWTxsW88-C4MkRCnxXPzRPrA_mt_22Bw",
    "https://arweave.net/5hVRV5kB7xNHrO7St9eLwLeNyHTZ67Akg-EGxJK7UWc",
    "https://arweave.net/uNAq9Smt0TTxe-jH_MtfldptU49iQ17TIJzYyZpB29s",
    "https://arweave.net/G6pfXyDc6h7eswD1hWFis6e5s1nJ8sxOsh5Md5Euizc",
    "https://arweave.net/ftY3_YpBCr3f2bZodlHg6Tn-mcIjtNuMxAUaxbTe89M",
    "https://arweave.net/M3gNViHgxtSCdP_wOL5Z-3AUwM1Du0vqUkFYrhsEW_c",
    "https://arweave.net/N6yKd7xaHY0M65dpzbnWIU0QjjH_0Q5HOS4mHNraScM"
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