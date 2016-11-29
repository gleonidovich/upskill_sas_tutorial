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
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
  
    // collect credit card fields
    var ccNum = $('#card-number').val(),
        cvcNum = $('#card-code').val(),
        expMonth = $('#card-month').val(),
        expYear = $('#card-year').val();
        
    // use stripe JS lib to validate card info
    var error = false;
    
    // validate card number
    if (!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert("The credit card number is invalid.");
    }
    
    // validate CVC
    if (!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert("The CVC number is invalid.");
    }
    
    // validate expiration date
    if (!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert("The expiration date is invalid.");
    }
    
    if (error) {
      // do not send to stripe
      submitBtn.prop('disabled', false).val('Sign up');
    } else {
      // send card info to Stripe
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    
    return false;
  });
  
  // Stripe respond with token
  function stripeResponseHandler(status, response) {
    // get token from response
    var token = response.id
  
    // Inject card token as hidden field in form
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]" value>').val(token) );
    
    // Submit form to rails app
    theForm.get(0).submit();
  }
});
