import { calculateOrderTotal } from "../utils/calculateTotal.js";
export const calculateOrder = async (req, res, next) => {
  const order = req.body.order;
  console.log(order);
  try {
    const value = calculateOrderTotal(order);
    res.status(200).json(value);
  } catch (error) {
    next(error);
  }
};
