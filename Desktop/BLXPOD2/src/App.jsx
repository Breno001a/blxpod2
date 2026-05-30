import { useState } from "react";
import "./App.css";

import blvk from "./imagens/blvk.png";
import sheep from "./imagens/blacksheep.png";
import elf from "./imagens/elfbar.png";
import lifepodBlack from "./imagens/lifepod.png";
import lifepodGold from "./imagens/lifepodgold.png";
import lifepodGrey from "./imagens/lifepodgrey.png";
import lifepodViolet from "./imagens/lifepodviolet.png";
import geekbar from "./imagens/geekbar.png";

export default function App() {
  const products = [
    {
      id: 1,
      name: "BLVK BAR 20k",
      price: 115,
      image: blvk,
      flavors: [
        "Kiwi Pitaia",
        "Laranja Kiwi",
        "Pêssego Maracujá",
        "Suco de Manga",
        "Maçã Verde Uva",
      ],
    },
    {
      id: 2,
      name: "BLACK SHEEP 25K",
      price: 130,
      image: sheep,
      flavors: [
        "Maçã Verde",
        "Ice Mint",
        "Blueberry",
        "Morango Ice",
        "Melancia",
      ],
    },

    {
  id: 3,
  name: "GEEKBAR 35K",
  price: 145,
  image: geekbar,
  flavors: [
    "Framboesa Azul Ice",
    "Maçã Ice",
    "Maracujá Kiwi",
    "Melancia Ice",
    "Menta Ice",
    "Morango Azedinho",
    "Morango Ice",
    "Morango Kiwi Ice",
    "Pirulito de Morango"
  ]
},


    {
      id: 4,
      name: "ELFBAR 4OK   ",
      price: 155,
      image: elf,
      flavors: [
        "Blueberry Ice",
        "Banana Ice",
        "Morango Kiwi",
        "Uva Ice",
        "Melancia Ice",
      ],
    },

{
  id: 5,
  name: "LIFEPOD THE ONE 40K BLACK",
  price: 155,
  image: lifepodBlack,
  flavors: [
      "Chiclete de Banana",
  "Chiclete Framboesa Azul",
  "Coco Melancia",
  "Energético Monster",
  "Halls de Amora",
  "Uva Ice"
  ]
},
{
  id: 6,
  name: "LIFEPOD THE ONE 40K GOLD",
  price: 155,
  image: lifepodGold,
  flavors: [
   "Chiclete de Cereja",
  "Chiclete de Framboesa Azul",
  "Halls de Amora",
  "Menthol",
  "Uva Ice"
  ]
},

{
  id: 7,
  name: "LIFEPOD THE ONE 40K GREY",
  price: 155,
  image: lifepodGrey,
  flavors: [
     "Love66",
  "Menta"
  ]
},
{
  id: 8,
  name: "LIFEPOD THE ONE 40K VIOLET",
  price: 155,
  image: lifepodViolet,
  flavors: [
     "Love66",
  "Menthol"
  ]
},


  ];

  const [selectedFlavors, setSelectedFlavors] = useState({});
  const [cart, setCart] = useState([]);

  function getFlavorEmoji(flavor) {
  const texto = flavor.toLowerCase();

  if (texto.includes("mint")) return "🧊";
  if (texto.includes("maçã")) return "🍏";
  if (texto.includes("uva")) return "🍇";
  if (texto.includes("banana")) return "🍌";
  if (texto.includes("kiwi")) return "🥝";
  if (texto.includes("laranja")) return "🍊";
  if (texto.includes("melancia")) return "🍉";
  if (texto.includes("morango")) return "🍓";
  if (texto.includes("pêssego")) return "🍑";
  if (texto.includes("manga")) return "🥭";
  if (texto.includes("blueberry")) return "🫐";

  return "🍓";
}
  const [customerName, setCustomerName] = useState("");

  function selectFlavor(productId, flavor) {
    setSelectedFlavors((prev) => ({
      ...prev,
      [productId]: flavor,
    }));
  }

  function addToCart(product) {
    const flavor = selectedFlavors[product.id];

    if (!flavor) {
      alert("Selecione um sabor!");
      return;
    }

    const newItem = {
      ...product,
      flavor,
      cartId: Date.now() + Math.random(),
    };

    setCart((prev) => [...prev, newItem]);
  }

  function removeItem(cartId) {
    setCart((prev) =>
      prev.filter((item) => item.cartId !== cartId)
    );
  }

  const total = cart.reduce(
    (acc, item) => acc + item.price,
    0
  );

  function finishOrder() {
    if (!customerName.trim()) {
      alert("Digite seu nome completo!");
      return;
    }

    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    let message = `
🔥 *NOVO PEDIDO - BLX PODS* 🔥

👤 Cliente:
${customerName}

━━━━━━━━━━━━━━━
`;

    cart.forEach((item, index) => {
      message += `
🛒 Produto ${index + 1}

📦 ${item.name}

💰 Valor: R$ ${item.price},00

`;
    });

    message += `
━━━━━━━━━━━━━━━

💵 TOTAL: R$ ${total},00

📲 PIX:
(19)988367807

⚠️ Após realizar o pagamento envie o comprovante neste mesmo número.

Obrigado pela preferência 🤝
`;

    const whatsappUrl = `https://wa.me/5519988367807?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  }

  return (
    <div className="app">
      <h1 className="title">
        BLX PODS 🔥
      </h1>

      <p className="subtitle">
        Os melhores Pods Premium • Entrega Rápida
      </p>

      <div className="products-grid">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />

            <h2>{product.name}</h2>

            <p className="price">
              R$ {product.price},00
            </p>

            <div className="flavors">
              {product.flavors.map((flavor) => (
                <button
                  key={flavor}
                  className={
                    selectedFlavors[product.id] === flavor
                      ? "flavor active"
                      : "flavor"
                  }
                  onClick={() =>
                    selectFlavor(product.id, flavor)
                  }
                >
                  {flavor}
                </button>
              ))}
            </div>

            <button
              className="add-button"
              onClick={() =>
                addToCart(product)
              }
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>

      <div className="customer-box">
        <h2>👤 Dados do Cliente</h2>

        <input
          type="text"
          placeholder="Digite seu nome completo"
          value={customerName}
          onChange={(e) =>
            setCustomerName(e.target.value)
          }
          className="customer-input"
        />
      </div>

      <div className="cart">
        <h2>
          🛒 Carrinho ({cart.length})
        </h2>

        {cart.length === 0 ? (
          <p>Nenhum produto adicionado.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                className="cart-item"
                key={item.cartId}
              >
                <div>
                  <h3>{item.name}</h3>
                 <p>{getFlavorEmoji(item.flavor)} {item.flavor}</p>
                  <p>
                    💰 R$ {item.price},00
                  </p>
                </div>

                <button
                  className="remove-button"
                  onClick={() =>
                    removeItem(item.cartId)
                  }
                >
                  Remover
                </button>
              </div>
            ))}

            <h3 className="total">
              Total: R$ {total},00
            </h3>

            <button
              className="finish-button"
              onClick={finishOrder}
            >
              FINALIZAR PEDIDO
            </button>
          </>
        )}
      </div>
    </div>
  );
}