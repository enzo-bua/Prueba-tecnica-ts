export const getAllUsers = async () => {
  const response = await fetch('https://randomuser.me/api?results=100');
  const data = await response.json();
  return data;
};