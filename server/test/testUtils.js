// Simulates the proccess data goes through when sent from express res.json()
export const parseData = (data) => {
  return JSON.parse(JSON.stringify(data));
};
