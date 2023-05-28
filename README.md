
### [🥚](https://xn--wr9h.ws) [nf/nth](https://nfnth.com) (new foundations)

Licensed as [**NfNth Corp**](https://secure.dor.wa.gov/) in the State of Washington, [19500 130th AV NE, Woodinville, WA 98072](https://blue.kingcounty.com/Assessor/eRealProperty/Dashboard.aspx?ParcelNbr=1428900123) 

*in the Wedge, cat's corner to Woodin elementary*

Home of the [🪨](https://xn--g19h.ws) [OCUR.app](https://ocur.app), map token

<!-- Load Stripe.js on your website. -->
<script src="https://js.stripe.com/v3"></script>

<!-- Create a button that your customers click to complete their purchase. Customize the styling to suit your branding. -->
<button
  style="background-color:#6772E5;color:#FFF;padding:8px 12px;border:0;border-radius:4px;font-size:1em;cursor:pointer"
  id="checkout-button-price_1NCnkuHtnEEsiKCN9RRuHv4h"
  role="link"
  type="button"
>
  Checkout
</button>

<div id="error-message"></div>

<script>
(function() {
  var stripe = Stripe('pk_live_51LsD4eHtnEEsiKCNaOlvv3Hh54aEX2GjPhrtcdMZcDPFFl4EttcqC5bhxTOUBSJ9lvstkxzqz4GLOe4vJKLrrHft00veYVOXU7');

  var checkoutButton = document.getElementById('checkout-button-price_1NCnkuHtnEEsiKCN9RRuHv4h');
  checkoutButton.addEventListener('click', function () {
    /*
     * When the customer clicks on the button, redirect
     * them to Checkout.
     */
    stripe.redirectToCheckout({
      lineItems: [{price: 'price_1NCnkuHtnEEsiKCN9RRuHv4h', quantity: 1}],
      mode: 'payment',
      /*
       * Do not rely on the redirect to the successUrl for fulfilling
       * purchases, customers may not always reach the success_url after
       * a successful payment.
       * Instead use one of the strategies described in
       * https://stripe.com/docs/payments/checkout/fulfill-orders
       */
      successUrl: window.location.protocol + '//mattdown.com/success',
      cancelUrl: window.location.protocol + '//mattdown.com/canceled',
    })
    .then(function (result) {
      if (result.error) {
        /*
         * If `redirectToCheckout` fails due to a browser or network
         * error, display the localized error message to your customer.
         */
        var displayError = document.getElementById('error-message');
        displayError.textContent = result.error.message;
      }
    });
  });
})();
</script>
