import { useState } from "react";
import { items } from "./data/items";

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
  console.log(packages);
  return (
    <div className="flex flex-row justify-center gap-8 py-12">
      <div>
        <div className="flex items-center gap-8">
          <h1 className="text-[2rem] font-semibold">Items</h1>
          <button
            onClick={fetchProducts}
            className="py-2 px-4 bg-green-400 text-white rounded-md">
            Place Order
          </button>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 w-[400px] justify-between ">
              <div className="bg-white flex px-8 py-4 rounded-md gap-4 w-[350px]">
                <h2 className="font-semibold text-slate-700 text-[1.1rem]">
                  {item.name}
                </h2>
                <p className="font-semibold text-slate-700 text-[1.1rem]">
                  Price: {item.price}
                </p>
                <p className="font-semibold text-slate-700 text-[1.1rem]">
                  Weight: {item.weightGrams}
                </p>
              </div>
              <div>
                <input
                  className="w-6 h-6"
                  type="checkbox"
                  value={item}
                  onChange={(e) => handleCheckboxChange(e, item)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {packages?.length > 0 && (
        <div className="flex flex-col gap-6 items-center px-10">
          <h1 className="text-[2rem]">Packages</h1>
          <div className="flex flex-col gap-8 ">
            {packages.map((pack, index) => (
              <div key={index} className="bg-white px-5 py-5">
                <div className="flex ">
                  <p className="font-semibold text-slate-700 text-[1.1rem] mr-1">
                    Items :{" "}
                  </p>
                  {pack.map((item, index) => (
                    <h2
                      key={index}
                      className="font-semibold text-slate-700 text-[1.1rem]">
                      {item.name} {index < pack.length - 1 ? " , " : " "}
                    </h2>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-[1.1rem] font-semibold text-slate-700">
                    Total Weight
                  </p>
                  <p className="text-[1.1rem] font-semibold text-slate-700">
                    {/* {pack.reduce((accu, curr) => (accu += curr.weightGrams), 0)} */}
                    {totalWeight[index]}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-[1.1rem] font-semibold text-slate-700">
                    Total Price
                  </p>
                  <p className="text-[1.1rem] font-semibold text-slate-700">
                    {/* {pack.reduce((accu, curr) => (accu += curr.price), 0)} */}
                    {totalPrice[index]}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-[1.1rem] font-semibold text-slate-700">
                    Total Courier
                  </p>
                  <p className="text-[1.1rem] font-semibold text-slate-700">
                    {courier[index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
