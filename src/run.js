// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const operations = input.cart.lines.map((line) => {

    const hasFabricLength = line.fabricLength?.value === "true";

    let currentPrice = parseFloat(line.cost.amountPerQuantity.amount);

    let newPrice = hasFabricLength ? currentPrice + 10 : currentPrice;

    return {
      update: {
        cartLineId: line.id,
        title: "You are hacked",
        price: {
          adjustment: {
            fixedPricePerUnit: {
              amount: newPrice.toFixed(2),  
            }
          }
        }
      }
    };
  });

  return operations.length > 0 ? { operations } : NO_CHANGES;
};
