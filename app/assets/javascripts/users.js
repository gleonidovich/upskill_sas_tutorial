/* global $, Stripe */

// document ready
$(document).on('turbolinks:load', function() {
  var theForm = $('#pro_form');
  var submitBtn = $('#form-signup-btn');
  
  // set Stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  // when user clicks form submit btn
  submitBtn.click(function(event) {
    // prevent default submission behavior
    event.preventDefault()
  
    // collect credit card fields
    var ccNum = $('#card-number').val(),
        cvcNum = $('#card-code').val(),
        expMonth = $('#card-month').val(),
        expYear = $('#card-year').val();
  
    // send card info to Stripe
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  });
  
  // Stripe respond with token
  
  // Inject card token as hidden field in form
  // Submit form to rails app
});
