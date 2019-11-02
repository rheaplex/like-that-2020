// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

const randomFloat = (low, high) => {
  const range = high - low;
  return low + (Math.random() * range);
};

const randomInt = (low, high) => {
  const range = (high - low) + 1;
  return Math.floor(randomFloat(low, high));
};
