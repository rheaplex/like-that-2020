const randomFloat = (low, high) => {
  const range = high - low;
  return low + (Math.random() * range);
};

const randomInt = (low, high) => {
  const range = (high - low) + 1;
  return Math.floor(randomFloat(low, high));
};
