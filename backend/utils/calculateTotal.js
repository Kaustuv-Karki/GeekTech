import { courier } from "../data/courierData.js";
import { shuffle } from "./shuffle.js";
import { standardDeviation } from "./standardDev.js";

export const calculateOrderTotal = (products) => {
  const shuffling = 10; // Total number of shuffle of the products
  const MAX_PRICE = 250; // Maximum price of the package
  let minCourierPrice = Infinity;
  let standardDev = Infinity;
  let finalPackage = [];
  let finalPackagePrice = 0;
  let finalPackageWeight = 0;
  let finalCourierFee = 0;

  const products_list = [];

  for (let i = 0; i < shuffling; i++) {
    products_list.push(shuffle([...products]));
  }

  const packages = [];
  let currentPackage = [];
  let currentPackagePrice = 0;

  for (const products of products_list) {
    for (const product of products) {
      if (currentPackagePrice + product.price > MAX_PRICE) {
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

    if (courierFee.reduce((a, b) => a + b, 0) < minCourierPrice) {
      minCourierPrice = courierFee.reduce((a, b) => a + b, 0);
      finalPackage = [...packages];
      finalPackageWeight = [...packageWeight];
      finalPackagePrice = [...packagePrice];
      finalCourierFee = [...courierFee];
      standardDev = standardDeviation(courierFee);
    } else if (courierFee.reduce((a, b) => a + b, 0) == minCourierPrice) {
      if (packages.length < finalPackage.length) {
        finalPackage = [...packages];
        finalPackageWeight = [...packageWeight];
        finalPackagePrice = [...packagePrice];
        finalCourierFee = [...courierFee];
      } else if (packages.length == finalPackage.length) {
        if (standardDeviation(courierFee) < standardDev) {
          finalPackage = [...packages];
          finalPackageWeight = [...packageWeight];
          finalPackagePrice = [...packagePrice];
          finalCourierFee = [...courierFee];
          standardDev = standardDeviation(courierFee);
        }
      }
    }

    packages.length = 0;
    currentPackage = [];
    currentPackagePrice = 0;
  }

  return {
    packages: finalPackage,
    packageWeight: finalPackageWeight,
    packagePrice: finalPackagePrice,
    courierFee: finalCourierFee,
  };
};
