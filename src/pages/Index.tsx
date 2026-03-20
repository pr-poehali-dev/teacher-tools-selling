import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "catalog" | "cart";

interface Product {
  id: number;
  name: string;
  price: number;
  color: string;
  size: string;
  image: string;
  tag?: string;
}

interface CartItem extends Product {
  qty: number;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Писюн «Классик»",
    price: 149,
    color: "Синий",
    size: "Стандарт",
    image: "https://cdn.poehali.dev/projects/c9240230-929a-4472-901d-d2b9393bdee6/files/16d0a388-fb79-41c5-9c50-7a3188978340.jpg",
    tag: "Хит",
  },
  {
    id: 2,
    name: "Писюн «Радуга»",
    price: 249,
    color: "Мультицвет",
    size: "Большой",
    image: "https://cdn.poehali.dev/projects/c9240230-929a-4472-901d-d2b9393bdee6/files/3d7f440f-3f7d-45f3-a7f6-1e8551011e8e.jpg",
    tag: "Новинка",
  },
  {
    id: 3,
    name: "Писюн «Премиум»",
    price: 449,
    color: "Золотой",
    size: "Маленький",
    image: "https://cdn.poehali.dev/projects/c9240230-929a-4472-901d-d2b9393bdee6/files/44f0d173-c0c0-4f6b-8720-c5d44437306f.jpg",
    tag: "Премиум",
  },
  {
    id: 4,
    name: "Писюн «Мини»",
    price: 89,
    color: "Красный",
    size: "Маленький",
    image: "https://cdn.poehali.dev/projects/c9240230-929a-4472-901d-d2b9393bdee6/files/16d0a388-fb79-41c5-9c50-7a3188978340.jpg",
  },
  {
    id: 5,
    name: "Писюн «Макси»",
    price: 349,
    color: "Зелёный",
    size: "Большой",
    image: "https://cdn.poehali.dev/projects/c9240230-929a-4472-901d-d2b9393bdee6/files/3d7f440f-3f7d-45f3-a7f6-1e8551011e8e.jpg",
  },
  {
    id: 6,
    name: "Писюн «Розовый»",
    price: 199,
    color: "Розовый",
    size: "Стандарт",
    image: "https://cdn.poehali.dev/projects/c9240230-929a-4472-901d-d2b9393bdee6/files/44f0d173-c0c0-4f6b-8720-c5d44437306f.jpg",
    tag: "Хит",
  },
];

const COLORS = ["Все", "Синий", "Мультицвет", "Золотой", "Красный", "Зелёный", "Розовый"];
const SIZES = ["Все", "Маленький", "Стандарт", "Большой"];

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filterColor, setFilterColor] = useState("Все");
  const [filterSize, setFilterSize] = useState("Все");
  const [priceRange, setPriceRange] = useState(500);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));
  const changeQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  const filtered = PRODUCTS.filter((p) => {
    if (filterColor !== "Все" && p.color !== filterColor) return false;
    if (filterSize !== "Все" && p.size !== filterSize) return false;
    if (p.price > priceRange) return false;
    return true;
  });

  return (
    <div className="min-h-screen mesh-bg font-golos">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setPage("home")}
            className="font-oswald text-2xl font-bold gradient-text tracking-wide hover:opacity-80 transition-opacity"
          >
            ПисюнШоп
          </button>
          <nav className="hidden md:flex gap-1">
            {(["home", "catalog", "cart"] as Page[]).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                  page === p
                    ? "bg-primary text-white shadow-md"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
              >
                {p === "home" ? "Главная" : p === "catalog" ? "Каталог" : "Корзина"}
              </button>
            ))}
          </nav>
          <button
            onClick={() => setPage("cart")}
            className="relative flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity animate-pulse-glow"
          >
            <Icon name="ShoppingCart" size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span className="hidden sm:inline">Корзина</span>
          </button>
        </div>
        <div className="md:hidden flex border-t border-border">
          {(["home", "catalog", "cart"] as Page[]).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`flex-1 py-2 text-xs font-medium transition-all ${
                page === p ? "text-primary border-b-2 border-primary" : "text-foreground/60"
              }`}
            >
              {p === "home" ? "Главная" : p === "catalog" ? "Каталог" : "Корзина"}
            </button>
          ))}
        </div>
      </header>

      {/* HOME PAGE */}
      {page === "home" && (
        <main>
          <section className="max-w-6xl mx-auto px-4 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6 animate-fade-in-up">
                ✏️ Лучший выбор для педагогов
              </div>
              <h1 className="font-oswald text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in-up delay-100">
                Писюны для{" "}
                <span className="gradient-text">учителей</span>{" "}
                с доставкой
              </h1>
              <p className="text-foreground/60 text-lg mb-8 animate-fade-in-up delay-200">
                Большой выбор канцтоваров: разные размеры, яркие цвета, доступные цены. Всё для комфортной работы в классе.
              </p>
              <div className="flex gap-3 flex-wrap animate-fade-in-up delay-300">
                <button
                  onClick={() => setPage("catalog")}
                  className="bg-primary text-white px-8 py-3.5 rounded-2xl font-bold text-base hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/30"
                >
                  Смотреть каталог
                </button>
                <button
                  onClick={() => setPage("cart")}
                  className="bg-white text-foreground px-8 py-3.5 rounded-2xl font-bold text-base border border-border hover:bg-muted transition-all"
                >
                  Моя корзина
                </button>
              </div>
            </div>
            <div className="relative animate-scale-in delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <img
                src="https://cdn.poehali.dev/projects/c9240230-929a-4472-901d-d2b9393bdee6/files/3d7f440f-3f7d-45f3-a7f6-1e8551011e8e.jpg"
                alt="Писюны"
                className="relative rounded-3xl shadow-2xl w-full object-cover aspect-square"
              />
            </div>
          </section>

          <section className="bg-white border-y border-border py-14">
            <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-3 gap-8">
              {[
                { icon: "Truck", title: "Быстрая доставка", desc: "По всей России от 1 дня" },
                { icon: "Star", title: "Только качество", desc: "Сертифицированные товары" },
                { icon: "Heart", title: "Любимый товар", desc: "Выбор тысяч учителей" },
              ].map((b, i) => (
                <div key={b.title} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name={b.icon} fallback="Star" size={22} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-base mb-1">{b.title}</div>
                    <div className="text-foreground/60 text-sm">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-oswald text-3xl font-bold">Хиты продаж</h2>
              <button
                onClick={() => setPage("catalog")}
                className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                Все товары <Icon name="ArrowRight" size={16} />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.filter((p) => p.tag).map((product, i) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} delay={i * 100} />
              ))}
            </div>
          </section>
        </main>
      )}

      {/* CATALOG PAGE */}
      {page === "catalog" && (
        <main className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="font-oswald text-4xl font-bold mb-8 animate-fade-in-up">
            Каталог <span className="gradient-text">товаров</span>
          </h1>

          <div className="bg-white rounded-2xl border border-border p-6 mb-8 animate-fade-in-up delay-100">
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-semibold text-foreground/70 mb-3 block">Цвет</label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setFilterColor(c)}
                      className={`px-3 py-1 rounded-xl text-sm font-medium transition-all ${
                        filterColor === c ? "bg-primary text-white shadow-md" : "bg-muted text-foreground/70 hover:bg-muted/80"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground/70 mb-3 block">Размер</label>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilterSize(s)}
                      className={`px-3 py-1 rounded-xl text-sm font-medium transition-all ${
                        filterSize === s ? "bg-primary text-white shadow-md" : "bg-muted text-foreground/70 hover:bg-muted/80"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground/70 mb-3 block">
                  Цена до: <span className="text-primary font-bold">{priceRange} ₽</span>
                </label>
                <input
                  type="range"
                  min={89}
                  max={500}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-pink-500"
                />
                <div className="flex justify-between text-xs text-foreground/40 mt-1">
                  <span>89 ₽</span>
                  <span>500 ₽</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 text-sm text-foreground/50">
            Найдено: <span className="font-bold text-foreground">{filtered.length}</span> товаров
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-foreground/40">
              <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">Ничего не найдено</p>
              <p className="text-sm mt-1">Попробуй изменить фильтры</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} delay={i * 80} />
              ))}
            </div>
          )}
        </main>
      )}

      {/* CART PAGE */}
      {page === "cart" && (
        <main className="max-w-4xl mx-auto px-4 py-10">
          <h1 className="font-oswald text-4xl font-bold mb-8 animate-fade-in-up">
            Ваша <span className="gradient-text">корзина</span>
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-24 animate-scale-in">
              <div className="text-7xl mb-6">🛒</div>
              <p className="text-xl font-bold mb-2">Корзина пуста</p>
              <p className="text-foreground/50 mb-6">Добавьте товары из каталога</p>
              <button
                onClick={() => setPage("catalog")}
                className="bg-primary text-white px-8 py-3.5 rounded-2xl font-bold hover:opacity-90 transition-all"
              >
                Перейти в каталог
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                {cart.map((item, i) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-border p-4 flex gap-4 items-center card-hover animate-fade-in-up">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-base mb-1 truncate">{item.name}</div>
                      <div className="text-sm text-foreground/50">{item.color} · {item.size}</div>
                      <div className="text-primary font-bold mt-1">{item.price} ₽</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeQty(item.id, -1)}
                        className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/70 flex items-center justify-center transition-all"
                      >
                        <Icon name="Minus" size={14} />
                      </button>
                      <span className="w-6 text-center font-bold">{item.qty}</span>
                      <button
                        onClick={() => changeQty(item.id, 1)}
                        className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/70 flex items-center justify-center transition-all"
                      >
                        <Icon name="Plus" size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 rounded-lg hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all text-foreground/30"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="animate-slide-in-right">
                <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
                  <h3 className="font-oswald text-xl font-bold mb-4">Ваш заказ</h3>
                  <div className="space-y-2 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-foreground/60 truncate mr-2">{item.name} ×{item.qty}</span>
                        <span className="font-medium shrink-0">{item.price * item.qty} ₽</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Итого</span>
                      <span className="text-primary">{totalPrice} ₽</span>
                    </div>
                  </div>
                  <button className="w-full bg-primary text-white py-3.5 rounded-2xl font-bold text-base hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-primary/30">
                    Оформить заказ
                  </button>
                  <button
                    onClick={() => setPage("catalog")}
                    className="w-full mt-3 text-foreground/50 text-sm hover:text-foreground transition-colors"
                  >
                    Продолжить покупки
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      <footer className="border-t border-border bg-white mt-20 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-oswald text-xl font-bold gradient-text">ПисюнШоп</span>
          <p className="text-foreground/40 text-sm">© 2024 ПисюнШоп. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({
  product,
  onAdd,
  delay = 0,
}: {
  product: Product;
  onAdd: (p: Product) => void;
  delay?: number;
}) {
  const tagColors: Record<string, string> = {
    Хит: "bg-primary text-white",
    Новинка: "bg-accent text-white",
    Премиум: "bg-secondary text-foreground",
  };

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden card-hover animate-fade-in-up">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
        {product.tag && (
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-xl text-xs font-bold ${tagColors[product.tag] ?? "bg-muted text-foreground"}`}>
            {product.tag}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-base mb-1">{product.name}</h3>
        <div className="flex gap-2 mb-3">
          <span className="text-xs bg-muted text-foreground/60 px-2 py-0.5 rounded-lg">{product.color}</span>
          <span className="text-xs bg-muted text-foreground/60 px-2 py-0.5 rounded-lg">{product.size}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl text-primary">{product.price} ₽</span>
          <button
            onClick={() => onAdd(product)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-all hover:scale-105"
          >
            <Icon name="Plus" size={16} />
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}