export const bannerData = [
  // {
  //   imgSrc: require('../../assets/banner/bannerColls/bannerImgOne.jpg'),
  // },
  // {
  //   imgSrc:require('../../assets/banner/bannerColls/bannerImgTwo.jpg'),
  // },
  // {
  //   imgSrc:require('../../assets/banner/bannerColls/bannerImgThree.jpg'),
  // },
  // {
  //   imgSrc:require('../../assets/banner/bannerColls/bannerImgFour.jpg'),
  // },
  // {
  //   imgSrc:require('../../assets/banner/bannerColls/bannerImgFive.jpg')
  // },
  {
    imgSrc:require('../../assets/banner/bannerColls/bb1.png')
  },
  {
    imgSrc:require('../../assets/banner/bannerColls/bb2.png')
  },
  {
    imgSrc:require('../../assets/banner/bannerColls/bb3.png')
  },
  {
    imgSrc:require('../../assets/banner/bannerColls/bb4.png')
  }
];
interface TechItem {
  imgSrc: string;
  name: string;
  discount: string;
}
export const tech:TechItem[] = [
  {
    imgSrc:require('../../assets/tech/image23.png'),
    name:"Mobiles",
    discount:"-20%"
  },
  {
    imgSrc:require('../../assets/tech/image28.png'),
    name:"Cameras",
    discount:"-40%"
  },
  {
    imgSrc:require('../../assets/tech/image29.png'),
    name:"Headphones",
    discount:"-50%"
  },
  {
    imgSrc:require('../../assets/tech/image34.png'),
    name:"Laptops",
    discount:"-40%"
  },
  {
    imgSrc:require('../../assets/tech/image35.png'),
    name:"Smart Watches",
    discount:"-30%"
  },
]
export const categories = [
  { 
    imageSrc: require('../../assets/catogory/mobiles.jpg'),
    altText: "Mobiles",
    categoryName: "Mobiles"
  },
  { 
    imageSrc: require('../../assets/catogory/appliances.jpg'),
    altText: "Appliances",
    categoryName: "Appliances"
  },
  { 
    imageSrc: require('../../assets/catogory/fashoin.jpg'),
    altText: "Fashoin",
    categoryName: "Fashion"
  },
  { 
    imageSrc: require('../../assets/catogory/Grocery.jpg'),
    altText: "Grocery",
    categoryName: "Grocery"
  },
  { 
    imageSrc: require('../../assets/catogory/toys2.jpg'),
    altText: "Toys",
    categoryName: "Toys"
  },
  { 
    imageSrc: require('../../assets/catogory/travel.jpg'),
    altText: "Travel",
    categoryName: "Travel"
  }
];