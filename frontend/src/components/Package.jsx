import React from "react";

const Package = ({ pack, index, totalPrice, totalWeight, courier }) => {
  return (
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
          {totalWeight}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-[1.1rem] font-semibold text-slate-700">
          Total Price
        </p>
        <p className="text-[1.1rem] font-semibold text-slate-700">
          {/* {pack.reduce((accu, curr) => (accu += curr.price), 0)} */}
          {totalPrice}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-[1.1rem] font-semibold text-slate-700">
          Total Courier
        </p>
        <p className="text-[1.1rem] font-semibold text-slate-700">{courier}</p>
      </div>
    </div>
  );
};

export default Package;
