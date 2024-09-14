export const fetchPrice = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return mock data
  return {
    ledger_state: {},
    items: [
      {
        price: "100"
      }
    ]
  };
};
