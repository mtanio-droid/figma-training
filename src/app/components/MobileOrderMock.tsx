import React, { useState } from "react";
import { ShoppingBag, Heart, Clock, Star, Plus, Minus, MapPin, Check, ChevronRight, Search, X } from "lucide-react";

type Screen = "list" | "detail" | "pickup";
type Category = "all" | "coffee" | "food" | "dessert";

interface Product {
  id: string;
  name: string;
  nameEn?: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  badge?: string;
  rating?: number;
  isPopular?: boolean;
  options?: {
    title: string;
    items: { name: string; price?: number }[];
  }[];
}

interface Order {
  id: string;
  orderNumber: string;
  status: "preparing" | "ready" | "completed";
  pickupTime: string;
  storeName: string;
  items: { name: string; quantity: number }[];
}

const products: Product[] = [
  {
    id: "1",
    name: "ブレンドコーヒー",
    nameEn: "Blend Coffee",
    price: 380,
    category: "coffee",
    image: "☕",
    description: "毎日飲みたくなる、バランスの良いブレンド",
    badge: "人気",
    rating: 4.5,
    isPopular: true,
    options: [
      { title: "サイズ", items: [{ name: "S" }, { name: "M", price: 50 }, { name: "L", price: 100 }] },
      { title: "温度", items: [{ name: "HOT" }, { name: "ICE" }] },
      { title: "ミルク", items: [{ name: "なし" }, { name: "通常", price: 50 }, { name: "豆乳", price: 80 }] },
    ],
  },
  {
    id: "2",
    name: "カフェラテ",
    nameEn: "Cafe Latte",
    price: 450,
    category: "coffee",
    image: "🥛",
    description: "ミルクのまろやかさとエスプレッソの香り",
    rating: 4.8,
    isPopular: true,
    options: [
      { title: "サイズ", items: [{ name: "S" }, { name: "M", price: 50 }, { name: "L", price: 100 }] },
      { title: "温度", items: [{ name: "HOT" }, { name: "ICE" }] },
    ],
  },
  {
    id: "3",
    name: "クロワッサン",
    nameEn: "Croissant",
    price: 280,
    category: "food",
    image: "🥐",
    description: "バターの香りが広がる、サクサクのクロワッサン。朝食にぴったり。",
    badge: "NEW",
    rating: 4.6,
  },
  {
    id: "4",
    name: "チーズケーキ",
    nameEn: "Cheesecake",
    price: 480,
    category: "dessert",
    image: "🍰",
    description: "濃厚でなめらか",
    rating: 4.7,
    isPopular: true,
  },
  {
    id: "5",
    name: "チョコレートマフィン",
    nameEn: "Chocolate Muffin",
    price: 320,
    category: "dessert",
    image: "🧁",
    description: "チョコチップたっぷり。温めるとさらに美味しい。コーヒーとの相性も抜群です。",
    rating: 4.3,
  },
  {
    id: "6",
    name: "サンドイッチ",
    nameEn: "Sandwich",
    price: 520,
    category: "food",
    image: "🥪",
    description: "新鮮な野菜とハムのサンドイッチ",
    badge: "本日限定",
  },
];

const sampleOrders: Order[] = [
  {
    id: "1",
    orderNumber: "A-042",
    status: "ready",
    pickupTime: "14:30",
    storeName: "渋谷スクランブルスクエア店",
    items: [
      { name: "ブレンドコーヒー (M)", quantity: 1 },
      { name: "クロワッサン", quantity: 2 },
    ],
  },
  {
    id: "2",
    orderNumber: "B-128",
    status: "preparing",
    pickupTime: "15:00",
    storeName: "渋谷スクランブルスクエア店",
    items: [
      { name: "カフェラテ (L)", quantity: 1 },
    ],
  },
  {
    id: "3",
    orderNumber: "A-035",
    status: "completed",
    pickupTime: "13:45",
    storeName: "渋谷スクランブルスクエア店",
    items: [
      { name: "ブレンドコーヒー (S)", quantity: 1 },
      { name: "チーズケーキ", quantity: 1 },
    ],
  },
];

export default function MobileOrderMock() {
  const [screen, setScreen] = useState<Screen>("list");
  const [category, setCategory] = useState<Category>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const filteredProducts = category === "all"
    ? products
    : products.filter(p => p.category === category);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setScreen("detail");
    setQuantity(1);
    setSelectedOptions({});
  };

  const handleBack = () => {
    setScreen("list");
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Screen Selector */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex gap-2">
            <button
              onClick={() => setScreen("list")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
                screen === "list"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              商品一覧
            </button>
            <button
              onClick={() => setScreen("detail")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
                screen === "detail"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              商品詳細
            </button>
            <button
              onClick={() => setScreen("pickup")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
                screen === "pickup"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              受け取り
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto bg-white min-h-[calc(100vh-64px)]">
        {screen === "list" && <ProductListScreen category={category} setCategory={setCategory} products={filteredProducts} onProductClick={handleProductClick} />}
        {screen === "detail" && <ProductDetailScreen product={selectedProduct || products[0]} quantity={quantity} setQuantity={setQuantity} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} onBack={handleBack} />}
        {screen === "pickup" && <PickupScreen orders={sampleOrders} />}
      </div>
    </div>
  );
}

function ProductListScreen({
  category,
  setCategory,
  products,
  onProductClick
}: {
  category: Category;
  setCategory: (c: Category) => void;
  products: Product[];
  onProductClick: (p: Product) => void;
}) {
  return (
    <div className="pb-6">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">メニュー</h1>
        <p className="text-sm text-gray-500">お好きな商品をお選びください</p>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="商品を検索"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Tabs - 学習ポイント: カテゴリ切り替え */}
      <div className="px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: "all" as Category, label: "すべて", icon: "🍴" },
            { id: "coffee" as Category, label: "コーヒー", icon: "☕" },
            { id: "food" as Category, label: "フード", icon: "🥐" },
            { id: "dessert" as Category, label: "デザート", icon: "🍰" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                category === cat.id
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards - 学習ポイント: 商品カードの繰り返し、リスト構造、テキスト量差分 */}
      <div className="px-4 space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => onProductClick(product)}
            className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg hover:border-purple-300 transition cursor-pointer"
          >
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="w-24 h-24 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl flex items-center justify-center text-4xl shrink-0">
                {product.image}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-1">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 leading-tight">{product.name}</h3>
                    {product.nameEn && (
                      <p className="text-xs text-gray-400 mt-0.5">{product.nameEn}</p>
                    )}
                  </div>
                  {/* Badge - 学習ポイント: バッジ */}
                  {product.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      product.badge === "人気"
                        ? "bg-orange-100 text-orange-700"
                        : product.badge === "NEW"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Description - 学習ポイント: テキスト量差分 */}
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>

                {/* Rating & Price */}
                <div className="flex items-center justify-between">
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    </div>
                  )}
                  <div className="text-lg font-bold text-purple-600">¥{product.price}</div>
                </div>
              </div>
            </div>

            {/* Popular indicator */}
            {product.isPopular && (
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-gray-500">
                <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                <span>人気商品</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetailScreen({
  product,
  quantity,
  setQuantity,
  selectedOptions,
  setSelectedOptions,
  onBack
}: {
  product: Product;
  quantity: number;
  setQuantity: (q: number) => void;
  selectedOptions: Record<string, string>;
  setSelectedOptions: (opts: Record<string, string>) => void;
  onBack: () => void;
}) {
  const totalPrice = product.price + (product.options?.reduce((sum, opt) => {
    const selected = selectedOptions[opt.title];
    const item = opt.items.find(i => i.name === selected);
    return sum + (item?.price || 0);
  }, 0) || 0);

  return (
    <div className="pb-24">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition"
      >
        <X className="w-5 h-5 text-gray-700" />
      </button>

      {/* Product Image */}
      <div className="w-full h-64 bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-8xl">{product.image}</div>
      </div>

      {/* Product Info - 学習ポイント: 商品情報の階層 */}
      <div className="px-6 py-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h1>
            {product.nameEn && (
              <p className="text-sm text-gray-400">{product.nameEn}</p>
            )}
          </div>
          {product.badge && (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              product.badge === "人気"
                ? "bg-orange-100 text-orange-700"
                : product.badge === "NEW"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
              {product.badge}
            </span>
          )}
        </div>

        {product.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="text-lg font-bold text-gray-800">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-500">(328件のレビュー)</span>
          </div>
        )}

        <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

        {/* Price */}
        <div className="bg-purple-50 rounded-xl p-4 mb-6">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-gray-600">基本価格</span>
            <span className="text-2xl font-bold text-purple-600">¥{product.price}</span>
          </div>
        </div>

        {/* Options - 学習ポイント: オプション選択 */}
        {product.options && product.options.length > 0 && (
          <div className="space-y-6 mb-6">
            {product.options.map((option) => (
              <div key={option.title}>
                <h3 className="text-sm font-bold text-gray-900 mb-3">{option.title}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {option.items.map((item) => {
                    const isSelected = selectedOptions[option.title] === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => setSelectedOptions({ ...selectedOptions, [option.title]: item.name })}
                        className={`py-3 px-4 rounded-xl text-sm font-medium transition ${
                          isSelected
                            ? "bg-purple-600 text-white shadow-lg shadow-purple-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <div>{item.name}</div>
                        {item.price && (
                          <div className="text-xs mt-0.5">+¥{item.price}</div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quantity - 学習ポイント: 数量変更 */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-900 mb-3">数量</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <Minus className="w-5 h-5 text-gray-700" />
            </button>
            <span className="text-2xl font-bold text-gray-900 w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition"
            >
              <Plus className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* CTA - 学習ポイント: CTA配置 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-purple-200 hover:shadow-2xl hover:shadow-purple-300 transition flex items-center justify-between px-6">
            <span>カートに追加</span>
            <span>¥{(totalPrice * quantity).toLocaleString()}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function PickupScreen({ orders }: { orders: Order[] }) {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "ready":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-700",
          badge: "bg-green-500",
          icon: <Check className="w-5 h-5 text-white" />
        };
      case "preparing":
        return {
          bg: "bg-orange-50",
          border: "border-orange-200",
          text: "text-orange-700",
          badge: "bg-orange-500",
          icon: <Clock className="w-5 h-5 text-white" />
        };
      case "completed":
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-500",
          badge: "bg-gray-400",
          icon: <Check className="w-5 h-5 text-white" />
        };
    }
  };

  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "ready":
        return "受け取り可能";
      case "preparing":
        return "準備中";
      case "completed":
        return "受け取り済み";
    }
  };

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">注文履歴</h1>
        <p className="text-sm text-gray-500">ご注文の状況を確認できます</p>
      </div>

      {/* Store Info */}
      <div className="mx-4 mb-6 bg-purple-50 border border-purple-200 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">受取店舗</h3>
            <p className="text-sm text-gray-700">渋谷スクランブルスクエア店</p>
            <p className="text-xs text-gray-500 mt-1">東京都渋谷区渋谷2-24-12 1F</p>
          </div>
        </div>
      </div>

      {/* Orders - 学習ポイント: ステータス、状態差分、優先順位の強弱 */}
      <div className="px-4 space-y-4">
        {orders.map((order) => {
          const colors = getStatusColor(order.status);
          const isPriority = order.status === "ready";

          return (
            <div
              key={order.id}
              className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-5 transition ${
                isPriority ? "shadow-lg" : ""
              }`}
            >
              {/* Status & Order Number - 学習ポイント: ステータス、受取番号 */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`${colors.badge} w-8 h-8 rounded-lg flex items-center justify-center`}>
                      {colors.icon}
                    </div>
                    <span className={`text-sm font-bold ${colors.text}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <div className={`text-3xl font-black ${colors.text} tracking-tight`}>
                    {order.orderNumber}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">受取番号</p>
                </div>

                {/* Pickup Time */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{order.pickupTime}</div>
                  <p className="text-xs text-gray-500">受取予定時刻</p>
                </div>
              </div>

              {/* Items */}
              <div className="mb-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">注文内容</h4>
                <div className="space-y-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="text-gray-500">×{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action - 学習ポイント: 優先順位の強弱、案内情報 */}
              {order.status === "ready" && (
                <div className="space-y-2">
                  <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    受け取る
                  </button>
                  <p className="text-xs text-center text-green-700 font-medium">
                    ご注文の商品をカウンターでお受け取りください
                  </p>
                </div>
              )}

              {order.status === "preparing" && (
                <div className="bg-white rounded-xl p-3 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-500 shrink-0" />
                  <p className="text-xs text-gray-600 leading-relaxed">
                    只今、心を込めて準備中です。準備が完了しましたら通知でお知らせします。
                  </p>
                </div>
              )}

              {order.status === "completed" && (
                <div className="text-center py-2">
                  <p className="text-xs text-gray-500">
                    ご利用ありがとうございました
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Help Section */}
      <div className="mx-4 mt-6 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-gray-900 mb-2">お困りですか？</h3>
        <button className="text-sm text-purple-600 font-medium hover:text-purple-700 transition flex items-center gap-1">
          よくある質問を見る
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
