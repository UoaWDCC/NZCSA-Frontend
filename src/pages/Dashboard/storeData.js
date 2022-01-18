const data = [
  {
    "name": "笼凤小馆",
    "discount": "10% off",
    "address": "12/26 Swanson Street, Auckland CBD, Auckland 1010",
    "image": "",
    "src": "2"
  },
  {
    "name": "Chattime",
    "discount": "Free Upsize",
    "address": "11/350 Queen Street, Auckland Central",
    "image": "",
    "src": "3"
  },
  {
    "name": "Kai",
    "discount": "5% off",
    "address": "1 Rutland Street, Auckland Central",
    "image": "16 Kai.png",
    "src": "4"
  },
  {
    "name": "Mellow",
    "discount": "10% off (消费$10+)",
    "address": "42A/42D High Street, Auckland Central",
    "image": "8 mellow.jpeg",
    "src": "5"
  },
  {
    "name": "The Cosmetic Store 药妆殿",
    "discount": "5% off",
    "address": "level 1/10 Victoria Street East, Auckland Central",
    "image": "11 cosmetic.png",
    "src": "6"
  },
  {
    "name": "Oxygen Floral",
    "discount": "10% off",
    "address": "https://oxygenfloral.co.nz/",
    "image": "",
    "src": "7"
  },
  {
    "name": "In Vogue",
    "discount": "10% off",
    "address": "47 Customs Street East, Auckland Central",
    "image": "1 In Vogue.png",
    "src": "8"
  },
  {
    "name": "妖茶",
    "discount": "10% off",
    "address": "2A Courthouse Lane, Auckland Central",
    "image": "妖茶2.png",
    "src": "9"
  },
  {
    "name": "有食",
    "discount": "10% off (消费$40+)",
    "address": "2 Kitchener Street, Auckland Central",
    "image": "有食.jpg",
    "src": "10"
  },
  {
    "name": "Song Cha （丧茶ct）",
    "discount": "12% off (仅限饮品)",
    "address": "448 Queen Street, Auckland Central",
    "image": "9 songcha.jpeg",
    "src": "11"
  },
  {
    "name": "Pophut",
    "discount": "10% off",
    "address": "239 Queen Street, Auckland Central",
    "image": "3 pophut.png",
    "src": "12"
  },
  {
    "name": "Chichop",
    "discount": "10% off（正价商品）",
    "address": "Student Quad, 34 Princes St, Auckland Central",
    "image": "赤炸.jpg",
    "src": "13"
  },
  {
    "name": "周家胡同",
    "discount": "10% off",
    "address": "6 Durham Street East, Auckland Central",
    "image": "7 周家胡同.jpeg",
    "src": "14"
  },
  {
    "name": "川尚",
    "discount": "免费小吃/软饮 (消费$20+)",
    "address": "2m/239 Queen Street, Auckland Central",
    "image": "5 川尚.png",
    "src": "15"
  },
  {
    "name": "渝味",
    "discount": "软饮 x 1 (消费$20+), 软饮/红糖冰粉 x 2 (消费$50+), \n$12.8以下冷菜任选 (消费$100+)",
    "address": "2/4 Lorne Street, Auckland Central",
    "image": "6 渝味.png",
    "src": "16"
  },
  {
    "name": "蜀渝",
    "discount": "10% off (消费$50+), 5% off (消费小于$50)",
    "address": "26 Lorne Street, Auckland Central",
    "image": "4 蜀渝.png",
    "src": "17"
  },
  {
    "name": "Orange Pool Club",
    "discount": "30% off (Saturday 4-7:30pm), 10% off (all other time)",
    "address": "9 City Road, Auckland CBD",
    "image": "orange pool club.jpeg",
    "src": "18"
  },
  {
    "name": "Synergy Sport",
    "discount": "$3 table tennis entry, 20% off Baminton/Basketball court (Mon-Fri 10am-5pm)",
    "address": "3/44 Portage Road, New Lynn, Auckland",
    "image": "synergy sport.png",
    "src": "19"
  },
  {
    "name": "少城公子",
    "discount": "10% off",
    "address": "660 Dominion Road, Mount Eden",
    "image": "12少城公子.jpeg",
    "src": "20"
  },
  {
    "name": "范特西韩国烧烤",
    "discount": "赠送regular奶茶一杯 (不含topping和特调系列)",
    "address": "3/83 New North Road, Eden Terrace",
    "image": "",
    "src": "21"
  },
  {
    "name": "Own Tea",
    "discount": "10% off",
    "address": "13 Lorne Street, CBD, Auckland",
    "image": "自茶logo.png",
    "src": "22"
  },
  {
    "name": "Kung Fu Chicken",
    "discount": "20% off",
    "address": "464 Queen Street, CBD, Auckland",
    "image": "",
    "src": ""
  },
  {
    "name": "半糖主义（city）",
    "discount": "10% off",
    "address": "Shop3/396 Queen Street, Auckland central",
    "image": "半糖主义logo.png",
    "src": "23"
  },
  {
    "name": "Balmoral ",
    "discount": "5% off",
    "address": "630  Dominion road, Mount Eden ,Auckland 1041",
    "image": "",
    "src": "24"
  },
  {
    "name": "福润超市",
    "discount": "5% off (消费$30+, 不含特价商品)",
    "address": "Basement, Unit 1A/239 Queen Street, CBD, Auckland",
    "image": "",
    "src": "25"
  },
  {
    "name": "乌鲁木齐美食",
    "discount": "10% off",
    "address": "598 Dominion Road,Mount Eden,Auckland 1041",
    "image": "",
    "src": "26"
  },
  {
    "name": "唐都美食",
    "discount": "10% off",
    "address": "971 Dominion Road,Mount Roskill,Auckland 1041",
    "image": "",
    "src": "27"
  },
  {
    "name": "Plus Chicken",
    "discount": "10% off",
    "address": "7 Lorne Street, CBD Auckland 1010",
    "image": "plus chicken.png",
    "src": "28"
  },
  {
    "name": "Sumthin Dumplin",
    "discount": "10% off",
    "address": "18-26 Wellesley Street East, CBD, Auckland 1010",
    "image": "sumthin-dumpling.png",
    "src": "29"
  },
  {
    "name": "小食尚",
    "discount": "10% off (消费$40+)",
    "address": "38 Totara Avenue, New Lynn, Auckland 0600",
    "image": "小食尚.png",
    "src": "30"
  },
  {
    "name": "亲爱de麻辣烫（ct）",
    "discount": "Free 酸梅汤",
    "address": "10 Wellesley Street East, CBD, Auckland",
    "image": "25 亲爱de麻辣烫.jpeg",
    "src": "31"
  },
  {
    "name": "亲爱de麻辣烫（北岸）",
    "discount": "10% off",
    "address": "13/94 Rosedale Road, rosedale, Auckland",
    "image": "25 亲爱de麻辣烫.jpeg",
    "src": "32"
  },
  {
    "name": "牛鲜生",
    "discount": "10% off (可叠加店内12%折扣)",
    "address": "Level1 50 high street, Auckland CBD",
    "image": "21 牛鲜生.jpeg",
    "src": "33"
  },
  {
    "name": "eggloo (Sylvia park/Mt Albert)",
    "discount": "10% off",
    "address": "883 New North Rd, Mt Albert/\nSylvia Park Shopping Center, 286 Mt Wellington Hw",
    "image": "24 eggloo.jpeg",
    "src": "34"
  },
  {
    "name": "So",
    "discount": "10% off（折扣不可叠加）",
    "address": "239 Queen Street, Auckland City, Auckland, New Zealand",
    "image": "",
    "src": ""
  },
  {
    "name": "Top Moda NZ Ltd",
    "discount": "10% off （折扣不可叠加）",
    "address": "239 Queen Street, Auckland City, Auckland, New Zealand",
    "image": "",
    "src": ""
  },
  {
    "name": "Yuan Taste （古早味）",
    "discount": "10% off",
    "address": "239 Queen Street, Auckland City, Auckland, New Zealand",
    "image": "古早味.jpg",
    "src": ""
  },
  {
    "name": "AndA",
    "discount": "10% off （折扣不可叠加，且不包括新品）",
    "address": "18-26 Wellesley Street, Auckland City, Auckland, New Zealand",
    "image": "AndA.jpg",
    "src": ""
  },
  {
    "name": "The Don",
    "discount": "10% off (促销商品除外，酒精类部分受限）",
    "address": "Mezzanine Floor, Canterbury Arcade 47 High St, Auckland",
    "image": "",
    "src": ""
  },
  {
    "name": "Taste Alley",
    "discount": "10% off (仅限饮品）",
    "address": "18 Wellesley St, Auckland City, Auckland",
    "image": "",
    "src": ""
  },
  {
    "name": "Giga",
    "discount": "",
    "address": "",
    "image": "",
    "src": "1"
  }
]

export default data;