export const parseMsToSec = (msTime) => {
  try{
    return (msTime / 1000).toFixed(2);
  } catch(e) {
    return null;
  }
};
