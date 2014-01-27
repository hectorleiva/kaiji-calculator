/*global $, jQuery*/
jQuery(document).ready(function($) {
    var quantity, errmsg, submit, final_quantity, compounds, original_loan_date;

    quantity = $('#quantity');
    errmsg = $('#errmsg');
    submit = $('#submit');
    original_loan_date = $('#loan_date');

  //called when key is pressed in textbox
  quantity.keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        errmsg.html("Digits Only").show().fadeOut("slow");
               return false;
    }
   });
  submit.on('click', function() {
    original_loan_date = original_loan_date.val();
    compounds = 10; // Should be compand every 10 minutes from original loan date.
    final_quantity = (quantity.val() * Math.pow((1+'.'+(Math.random()*11)), compounds));
  });
});