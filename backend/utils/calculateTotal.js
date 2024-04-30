import { courier } from "../data/courierData.js";

export const calculateOrderTotal = (products) => {
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
  const packages = [];
  let currentPackage = [];
  let currentPackagePrice = 0;

  for (const product of products) {
    if (currentPackagePrice + product.price > 250) {
      packages.push(currentPackage);
      currentPackage = [product];
      currentPackagePrice = product.price;
    } else {
      currentPackage.push(product);
      currentPackagePrice += product.price;
    }
  }
  if (currentPackage.length != 0) {
    packages.push(currentPackage);
  }

  const packageWeight = packages.map((pack) =>
    pack.reduce((sum, product) => (sum += product.weightGrams), 0)
  );

  const packagePrice = packages.map((pack) =>
    pack.reduce((sum, product) => (sum += product.price), 0)
  );

  const courierFee = packageWeight.map((weight) => {
    for (let i = 0; i < courier.length; i++) {
      if (weight <= courier[i].maxWeight) {
        return courier[i].maxPrice;
      }
    }
  });
  return {
    packages,
    packageWeight,
    packagePrice,
    courierFee,
  };
};
