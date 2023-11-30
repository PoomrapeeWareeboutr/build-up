import { apiSlice } from './api-slice';

export const buyingHistorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersByToken: builder.query({
      query: (token) => ({
        url: '/order/findOrderByToken',
        method: 'POST',
        body: { token },
      }),
      transformResponse: (res) => {
        return res.data.sort((a, b) => b.orderId - a.orderId);
      },
    }),
  }),
});

export const { useGetOrdersByTokenQuery } = buyingHistorySlice;
