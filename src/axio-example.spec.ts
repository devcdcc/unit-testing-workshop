import axios from 'axios';

describe('Axios', () => {
  test('get', async () => {
    const response = await axios.post('https://github.com/axios/axios',{})
    expect(response.status).toBe(200)
  });
});
