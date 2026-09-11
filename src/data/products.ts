import { Product, SizeOption } from "@/types/product";

const sizes = (labels: string[], soldOut: string[] = []): SizeOption[] =>
  labels.map((label) => ({ label, inStock: !soldOut.includes(label) }));

const BABY = ["56", "62", "68", "74", "80"];
const TODDLER = ["80", "86", "92", "98", "104"];
const KID = ["92", "98", "104", "110", "116"];

export const products: Product[] = [
  {
    id: "p-001",
    slug: "komplekt-vyazanyi-norra",
    title: "Комплект в’язаний Norra",
    subtitle: "меринос · 100%",
    category: "clothing",
    kind: "apparel",
    price: 2340,
    badges: ["bestseller"],
    description:
      "Кофтинка та штанці з тонкого мериносу з м’якою резинкою на поясі. В’яжеться однією деталлю, тож усередині немає жодного шва, який міг би тиснути.",
    details: [
      { label: "Склад", value: "100% меринос (superwash)" },
      { label: "Догляд", value: "Делікатне прання 30°, сушити горизонтально" },
      { label: "Виробництво", value: "Україна" },
    ],
    colors: [
      {
        id: "c-milk",
        name: "Молочний",
        hex: "#EFE7DA",
        images: [
          "/images/products/knit-set-1.jpg",
          "/images/products/knit-set-2.jpg",
        ],
        sizes: sizes(BABY, ["56"]),
      },
      {
        id: "c-caramel",
        name: "Карамель",
        hex: "#C8A882",
        images: [
          "/images/products/knit-set-2.jpg",
          "/images/products/knit-set-1.jpg",
        ],
        sizes: sizes(BABY),
      },
    ],
  },
  {
    id: "p-002",
    slug: "doshchovyk-rain",
    title: "Дощовик Rain",
    subtitle: "мембрана · 5 000 мм",
    category: "clothing",
    kind: "apparel",
    price: 1890,
    badges: [],
    description:
      "Прямий силует, проклеєні шви та капюшон на кнопках. Ширина розрахована так, щоб дощовик легко вдягався поверх светра.",
    details: [
      { label: "Склад", value: "Поліестер з PU-мембраною" },
      { label: "Водостійкість", value: "5 000 мм" },
      { label: "Догляд", value: "Протирати вологою губкою, не прасувати" },
    ],
    colors: [
      {
        id: "c-saffron",
        name: "Шафран",
        hex: "#E3B23C",
        images: [
          "/images/products/raincoat-1.jpg",
          "/images/products/raincoat-2.jpg",
        ],
        sizes: sizes(KID, ["116"]),
      },
      {
        id: "c-graphite",
        name: "Графіт",
        hex: "#4A4A48",
        images: [
          "/images/products/raincoat-2.jpg",
          "/images/products/raincoat-1.jpg",
        ],
        sizes: sizes(KID),
      },
    ],
  },
  {
    id: "p-003",
    slug: "palto-snow",
    title: "Пальто Snow",
    subtitle: "вовна · утеплене",
    category: "clothing",
    kind: "apparel",
    price: 3280,
    oldPrice: 3900,
    badges: ["sale"],
    description:
      "Утеплене пальто прямого крою з вовняної тканини. Приховані кнопки, глибокі кишені й підкладка з бавовни, яка не електризується.",
    details: [
      { label: "Склад", value: "60% вовна, підкладка — бавовна" },
      { label: "Температура", value: "від +5 до −5 °C" },
      { label: "Догляд", value: "Хімчистка або делікатне прання 30°" },
    ],
    colors: [
      {
        id: "c-sand",
        name: "Пісочний",
        hex: "#D9CBB6",
        images: [
          "/images/products/coat-1.jpg",
          "/images/products/coat-2.jpg",
        ],
        sizes: sizes(TODDLER, ["80"]),
      },
      {
        id: "c-moss",
        name: "Мох",
        hex: "#7C8A72",
        images: [
          "/images/products/coat-2.jpg",
          "/images/products/coat-1.jpg",
        ],
        sizes: sizes(TODDLER),
      },
    ],
  },
  {
    id: "p-004",
    slug: "romper-cloud",
    title: "Ромпер Cloud",
    subtitle: "органічна бавовна",
    category: "clothing",
    kind: "apparel",
    price: 1240,
    badges: ["new"],
    description:
      "Ромпер на кнопках по всій довжині ніжки — перевдягти можна однією рукою. Полотно пом’якшене без хімії, тому приємне з першого дня.",
    details: [
      { label: "Склад", value: "100% органічна бавовна GOTS" },
      { label: "Застібка", value: "Нікель-фрі кнопки" },
      { label: "Догляд", value: "Прання 40°, без відбілювача" },
    ],
    colors: [
      {
        id: "c-powder",
        name: "Пудра",
        hex: "#E8D3D1",
        images: [
          "/images/products/romper-1.jpg",
          "/images/products/romper-2.jpg",
        ],
        sizes: sizes(BABY),
      },
      {
        id: "c-milk",
        name: "Молочний",
        hex: "#F2EDE6",
        images: [
          "/images/products/romper-2.jpg",
          "/images/products/romper-1.jpg",
        ],
        sizes: sizes(BABY, ["80"]),
      },
    ],
  },
  {
    id: "p-005",
    slug: "kardygan-oversayz-olen",
    title: "Кардиган оверсайз Olen",
    subtitle: "вовна · альпака",
    category: "clothing",
    kind: "apparel",
    price: 2680,
    badges: ["bestseller"],
    description:
      "Об’ємне плетіння з домішкою альпаки й приспущена лінія плеча. Носиться і як кардиган, і як легке пальто в міжсезоння.",
    details: [
      { label: "Склад", value: "70% вовна, 30% альпака" },
      { label: "Посадка", value: "Оверсайз, беріть свій розмір" },
      { label: "Догляд", value: "Хімчистка або ручне прання 30°" },
    ],
    colors: [
      {
        id: "c-oat",
        name: "Вівсяний",
        hex: "#D8C9AF",
        images: [
          "/images/products/cardigan-1.jpg",
          "/images/products/cardigan-2.jpg",
        ],
        sizes: sizes(KID, ["92"]),
      },
      {
        id: "c-terracotta",
        name: "Теракота",
        hex: "#B4674D",
        images: [
          "/images/products/cardigan-2.jpg",
          "/images/products/cardigan-1.jpg",
        ],
        sizes: sizes(KID),
      },
    ],
  },
  {
    id: "p-006",
    slug: "suknya-tula",
    title: "Сукня Tula",
    subtitle: "фатин · бавовняна підкладка",
    category: "clothing",
    kind: "apparel",
    price: 2150,
    badges: ["new"],
    description:
      "Три шари м’якого фатину на бавовняній підкладці — тримає форму, але не колеться. Пояс на широкій резинці без застібок.",
    details: [
      { label: "Склад", value: "Верх — поліамід, підкладка — бавовна" },
      { label: "Довжина", value: "Міді, нижче коліна" },
      { label: "Догляд", value: "Ручне прання 30°, сушити на плічках" },
    ],
    colors: [
      {
        id: "c-charcoal",
        name: "Вугільний",
        hex: "#2A2826",
        images: ["/images/products/dress-1.jpg", "/images/products/dress-2.jpg"],
        sizes: sizes(KID),
      },
      {
        id: "c-powder",
        name: "Пудра",
        hex: "#E8D3D1",
        images: ["/images/products/dress-2.jpg", "/images/products/dress-1.jpg"],
        sizes: sizes(KID, ["110", "116"]),
      },
    ],
  },
  {
    id: "p-007",
    slug: "pinetky-vyazani-lys",
    title: "Пінетки в’язані Lys",
    subtitle: "меринос · ручна робота",
    category: "accessories",
    kind: "apparel",
    price: 690,
    badges: [],
    description:
      "В’яжуться вручну, з нееластичною петлею на щиколотці — тримаються навіть на активному малюку. Підошва з подвійного полотна.",
    details: [
      { label: "Склад", value: "100% меринос" },
      { label: "Розміри", value: "16–19 (0–12 місяців)" },
      { label: "Догляд", value: "Ручне прання 30°" },
    ],
    colors: [
      {
        id: "c-milk",
        name: "Молочний",
        hex: "#F2EDE6",
        images: [
          "/images/products/booties-1.jpg",
          "/images/products/booties-2.jpg",
        ],
        sizes: sizes(["16", "17", "18", "19"], ["19"]),
      },
      {
        id: "c-sage",
        name: "Шавлія",
        hex: "#A8B5A0",
        images: [
          "/images/products/booties-2.jpg",
          "/images/products/booties-1.jpg",
        ],
        sizes: sizes(["16", "17", "18", "19"]),
      },
    ],
  },
  {
    id: "p-008",
    slug: "shapka-vyazana-vinter",
    title: "Шапка в’язана Vinter",
    subtitle: "меринос · подвійне полотно",
    category: "accessories",
    kind: "apparel",
    price: 780,
    badges: ["new"],
    description:
      "Подвійне полотно без внутрішніх швів і флісової підкладки, яка електризує волосся. Тримає форму після прання.",
    details: [
      { label: "Склад", value: "100% меринос" },
      { label: "Розміри", value: "За обхватом голови" },
      { label: "Догляд", value: "Ручне прання 30°, сушити горизонтально" },
    ],
    colors: [
      {
        id: "c-caramel",
        name: "Карамель",
        hex: "#C8A882",
        images: [
          "/images/products/beanie-1.jpg",
          "/images/products/beanie-2.jpg",
        ],
        sizes: sizes(["44–46", "48–50", "52–54"]),
      },
      {
        id: "c-milk",
        name: "Молочний",
        hex: "#F2EDE6",
        images: [
          "/images/products/beanie-2.jpg",
          "/images/products/beanie-1.jpg",
        ],
        sizes: sizes(["44–46", "48–50", "52–54"], ["44–46"]),
      },
    ],
  },
  {
    id: "p-009",
    slug: "ksylofon-piramidka-tra",
    title: "Ксилофон-пірамідка Trä",
    subtitle: "бук · від 12 місяців",
    category: "toys",
    kind: "toy",
    price: 1460,
    badges: [],
    description:
      "Дві іграшки в одній: настроєний ксилофон і пірамідка на кільцях. Фарби на водній основі, кромки заокруглені вручну.",
    details: [
      { label: "Матеріал", value: "Масив бука, фарби на водній основі" },
      { label: "Вік", value: "Від 12 місяців" },
      { label: "Розмір", value: "28 × 12 × 14 см" },
    ],
    colors: [
      {
        id: "c-natural",
        name: "Натуральне дерево",
        hex: "#C89F6B",
        images: [
          "/images/products/xylophone-1.jpg",
          "/images/products/xylophone-2.jpg",
        ],
        sizes: [],
      },
    ],
  },
  {
    id: "p-010",
    slug: "zaichyk-vyazanyi-bo",
    title: "Зайчик в’язаний Bo",
    subtitle: "бавовна · ручна робота",
    category: "toys",
    kind: "toy",
    price: 980,
    badges: ["bestseller"],
    description:
      "В’язаний гачком зайчик з довгими вухами, за які зручно тримати. Наповнювач — гіпоалергенний холлофайбер, очі вишиті ниткою.",
    details: [
      { label: "Матеріал", value: "Бавовна, холлофайбер" },
      { label: "Висота", value: "26 см разом з вухами" },
      { label: "Догляд", value: "Ручне прання 30°" },
    ],
    colors: [
      {
        id: "c-milk",
        name: "Молочний",
        hex: "#F2EDE6",
        images: ["/images/products/bunny-1.jpg", "/images/products/bunny-2.jpg"],
        sizes: [],
      },
      {
        id: "c-sand",
        name: "Пісок",
        hex: "#D8C9AF",
        images: ["/images/products/bunny-2.jpg", "/images/products/bunny-1.jpg"],
        sizes: [],
      },
    ],
  },
];
