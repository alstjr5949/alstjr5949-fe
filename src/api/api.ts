import axios from 'axios';

export const getUserData = async (userID: string) => {
  const res = await axios.get(`/users/${userID}`);
  return res.data;
};

export const getProductsData = async (pageNum: string | string[] | undefined, size?: number) => {
  const res = await axios.get(`/products?page=${pageNum}&size=${size}`);
  return res.data;
};

export const getInfProductsData = async (size: number) => {
  const res = await axios.get(`/products?page=1&size=${size}`);
  return res.data.data.products;
};
