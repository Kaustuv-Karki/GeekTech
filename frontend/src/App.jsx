import { useState } from "react";
import { items } from "./data/items";
import Items from "./components/Items";
import Package from "./components/Package";

function App() {
  const [products, setProducts] = useState([]);
  const [packages, setPackages] = useState([]);
  const [courier, setCourier] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [totalWeight, setTotalWeight] = useState([]);

  const handleCheckboxChange = (e, item) => {
    if (e.target.checked) {
      setProducts([...products, item]);
    } else {
      setProducts(products.filter((product) => product !== item));
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/order/calculate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order: products }),
        }
      );
      const data = await response.json();
      // console.log("This is data", data);
      setPackages(data.packages);
      setCourier(data.courierFee);
      setTotalPrice(data.packagePrice);
      setTotalWeight(data.packageWeight);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row justify-center gap-8 py-12">
      <div>
        <div className="flex items-center gap-8 justify-between">
          <h1 className="text-[2rem] font-semibold text-slate-700 px-2">
            Items
          </h1>
          <button
            onClick={fetchProducts}
            className="py-2 px-4 bg-green-400 text-white rounded-md">
            Place Order
          </button>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {items.map((item, index) => (
            <Items
              key={index}
              item={item}
              index={index}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </div>
      </div>
      {packages?.length > 0 && (
        <div className="flex flex-col gap-6 items-center px-10">
          <h1 className="text-[2rem] text-slate-700 font-semibold">Packages</h1>
          <div className="flex flex-col gap-8 ">
            {packages.map((pack, index) => (
              <Package
                key={index}
                pack={pack}
                index={index}
                totalPrice={totalPrice[index]}
                totalWeight={totalWeight[index]}
                courier={courier[index]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
