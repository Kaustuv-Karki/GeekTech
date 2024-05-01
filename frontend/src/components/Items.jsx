const Items = ({ item, index, handleCheckboxChange }) => {
  return (
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
  );
};

export default Items;
