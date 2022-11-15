import axios from 'axios';

export const getUserData = async (userID: string) => {
  try {
    const res = await axios.get(`/users/${userID}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsData = async (pageNum: string | string[] | undefined, size?: number) => {
  try {
    const res = await axios.get(`/products?page=${pageNum}&size=${size}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInfProductsData = async (size: number) => {
  try {
    const res = await axios.get(`/products?page=1&size=${size}`);
    return res.data.data.products;
  } catch (error) {
    console.log(error);
  }
};
