export type EDGE_FUNCTIONS_RESPONSES = {
  getLoomJws: {
    jws: string;
  };
  createPaymentIntent: {
    clientSecret: string;
  };
  sendEmail: {
    MessageId: string;
    ErrorCode: number;
  };
  createCheckoutSession: {
    url: string;
  };
};
