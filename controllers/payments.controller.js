const Razorpay = require("razorpay");

const makePayment = async (req, res) => {
  try {
    const { amount } = req.body;

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const order = await instance.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt#1",
    });

    res.status(200).json({
      success: true,
      orderData: {
        orderId: order.id,
        transactionAmount: order.amount,
      },
      message: "Payment Successfull",
    });
  } catch (err) {
    res.json({ success: false, message: "Payment failed" });
  }
};

module.exports = { makePayment };
