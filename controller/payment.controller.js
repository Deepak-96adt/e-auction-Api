import Stripe from "stripe";
const stripe = Stripe(
"sk_test_51PuXp9A2KuS5b3SQ06taAByCPkySz0EiWIl8ZW07w1PNnYXGg34uFUVXJNrmxbpnn760bENU3ngZ0hvoLctYh5z000JiXYJZ3p"  
);

async function Gateway(req, res) {
  try {
    const product = await stripe.products.create({
      name: req.body.title,
    //   name: "xyz",
      description: req.body.description,
    //   description: "abcd",
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: req.body.bidprice * 100, // 100 INR
    //   unit_amount: 100 * 100, // 100 INR
      currency: "inr",
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      customer_email: req.body.user_email,
    });
    console.log(
        // stripe.redirectToCheckout({ sessionId: session.id })
        stripe.checkout.sessions
    );
    res.json({ url: session.url ,mode:session.mode,success_url:session.success_url,cancel_url:session.cancel_url});
  } catch (error) {
    console.error("Error creating payment session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default Gateway;