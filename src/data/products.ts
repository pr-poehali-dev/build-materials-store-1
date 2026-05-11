export type Product = {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  unit: string;
  brand: string;
  inStock: boolean;
  stockCount?: number;
  discount?: number;
  image: string;
  characteristics: Record<string, string | number>;
  description: string;
  tags: string[];
};

export const CATEGORIES = [
  { id: "dry-mixes", name: "Сухие смеси", icon: "Package", count: 48 },
  { id: "lumber", name: "Пиломатериалы", icon: "Layers", count: 32 },
  { id: "tools", name: "Инструмент", icon: "Wrench", count: 156 },
  { id: "plumbing", name: "Сантехника", icon: "Droplets", count: 74 },
  { id: "electrical", name: "Электрика", icon: "Zap", count: 93 },
  { id: "fasteners", name: "Крепёж", icon: "Settings", count: 210 },
  { id: "paints", name: "Краски и лаки", icon: "Paintbrush", count: 67 },
  { id: "insulation", name: "Утеплители", icon: "Shield", count: 29 },
];

export const BRANDS = [
  "Knauf", "Ceresit", "Bosch", "Makita", "DeWalt",
  "Hilti", "Rockwool", "Технониколь", "URSA", "Grundfos",
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Наливной пол Knauf Boden 15",
    category: "dry-mixes",
    subcategory: "Наливные полы",
    price: 680,
    unit: "мешок 25кг",
    brand: "Knauf",
    inStock: true,
    discount: 15,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400",
    characteristics: {
      "Прочность на сжатие": "20 МПа",
      "Время жизни раствора": "30 мин",
      "Морозостойкость": "F50",
      "Адгезия": "≥ 0.5 МПа",
      "Расход": "1.5 кг/м²/мм",
      "Толщина слоя": "5-15 мм",
    },
    description: "Самовыравнивающийся наливной пол для внутренних работ. Идеален для выравнивания оснований под финишные покрытия.",
    tags: ["наливной пол", "выравнивание", "стяжка"],
  },
  {
    id: 2,
    name: "Штукатурка Ceresit CT 29",
    category: "dry-mixes",
    subcategory: "Штукатурки",
    price: 520,
    unit: "мешок 25кг",
    brand: "Ceresit",
    inStock: true,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    characteristics: {
      "Прочность на сжатие": "≥ 8 МПа",
      "Время жизни раствора": "150 мин",
      "Морозостойкость": "F35",
      "Расход": "14 кг/м² (10мм)",
      "Толщина слоя": "5-30 мм",
    },
    description: "Лёгкая штукатурка для выравнивания стен и потолков внутри помещений.",
    tags: ["штукатурка", "выравнивание стен", "внутренние работы"],
  },
  {
    id: 3,
    name: "Дрель-шуруповёрт Bosch GSR 185-LI",
    category: "tools",
    subcategory: "Шуруповёрты",
    price: 8900,
    unit: "шт",
    brand: "Bosch",
    inStock: true,
    discount: 10,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400",
    characteristics: {
      "Тип питания": "Аккумулятор",
      "Напряжение": "18В",
      "Платформа": "Bosch 18V",
      "Крутящий момент": "25 Нм",
      "Частота вращения": "1900 об/мин",
      "Вес": "1.1 кг",
    },
    description: "Компактный аккумуляторный шуруповёрт для повседневных задач. Совместим с аккумуляторами платформы Bosch 18V.",
    tags: ["шуруповёрт", "дрель", "аккумуляторный", "bosch"],
  },
  {
    id: 4,
    name: "Болгарка Makita GA9020",
    category: "tools",
    subcategory: "Угловые шлифмашины",
    price: 12500,
    unit: "шт",
    brand: "Makita",
    inStock: true,
    image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400",
    characteristics: {
      "Тип питания": "Сеть",
      "Мощность": "2200 Вт",
      "Диаметр диска": "230 мм",
      "Частота вращения": "6600 об/мин",
      "Вес": "5.2 кг",
    },
    description: "Профессиональная угловая шлифмашина для резки и зачистки металла, бетона.",
    tags: ["болгарка", "угловая шлифмашина", "резка", "makita"],
  },
  {
    id: 5,
    name: "Дюбель-гвоздь 6×40 (500 шт)",
    category: "fasteners",
    subcategory: "Дюбели",
    price: 280,
    unit: "упак",
    brand: "Технониколь",
    inStock: true,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    characteristics: {
      "Длина": "40 мм",
      "Диаметр резьбы": "М6",
      "Покрытие": "Оцинковка",
      "Нагрузка на срез": "1.2 кН",
      "Материал": "Сталь + нейлон",
    },
    description: "Универсальный дюбель-гвоздь для бетона, кирпича и газобетона.",
    tags: ["дюбель", "крепёж", "бетон"],
  },
  {
    id: 6,
    name: "Краска Dulux Professional W&C матовая белая",
    category: "paints",
    subcategory: "Краски для стен",
    price: 2400,
    unit: "ведро 10л",
    brand: "Knauf",
    inStock: false,
    stockCount: 0,
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400",
    characteristics: {
      "Тип поверхности": "Стены и потолки",
      "Расход": "8-10 м²/л",
      "Время высыхания": "2 ч",
      "Степень глянца": "Матовая",
      "Разбавитель": "Вода",
      "Количество слоёв": "2",
    },
    description: "Профессиональная матовая краска для внутренних работ. Высокая укрывистость, стойкость к мытью.",
    tags: ["краска", "матовая", "белая", "интерьерная"],
  },
  {
    id: 7,
    name: "Утеплитель Rockwool Лайт Баттс",
    category: "insulation",
    subcategory: "Минеральная вата",
    price: 1850,
    unit: "упак 7.2м²",
    brand: "Rockwool",
    inStock: true,
    discount: 8,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400",
    characteristics: {
      "Тип": "Минеральная вата",
      "Теплопроводность": "0.037 Вт/м·К",
      "Толщина": "100 мм",
      "Плотность": "37 кг/м³",
      "Пожаробезопасность": "НГ",
    },
    description: "Лёгкий утеплитель для каркасных конструкций. Не требует дополнительной защиты.",
    tags: ["утеплитель", "минвата", "rockwool", "теплоизоляция"],
  },
  {
    id: 8,
    name: "Труба ПП Valsir 110×2000",
    category: "plumbing",
    subcategory: "Канализационные трубы",
    price: 890,
    unit: "шт",
    brand: "Grundfos",
    inStock: true,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    characteristics: {
      "Материал": "Полипропилен",
      "Диаметр": "110 мм",
      "Длина": "2000 мм",
      "Толщина стенки": "2.7 мм",
      "Применение": "Канализация",
    },
    description: "Канализационная труба из полипропилена для внутренней канализации.",
    tags: ["труба", "канализация", "пп", "сантехника"],
  },
];
