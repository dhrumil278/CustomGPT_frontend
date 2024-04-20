import axios from 'axios';

export const api = async (data) => {
  console.log('data: ', data);
  console.log('data2: ', {
    method: data.method,
    url: data.url,
    data: data.data,
  });
  try {
    const response = await axios({
      method: data.method,
      url: data.url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`,
      },
      data: data.data,
    });
    console.log('response.data: ', response.data);
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return error.response.data;
  }
};
