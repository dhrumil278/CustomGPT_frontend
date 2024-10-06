import axios from 'axios';

export const api = async (data) => {
  console.log('data: ', data);
  const token = await localStorage.getItem('accessToken');
  try {
    const response = await axios({
      method: data.method,
      url: data.url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data?.data || {},
    });
    console.log('response.data: ', response?.data);

    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return error?.response?.data;
  }
};
