/*global $, jQuery*/

/*

    (Amount)*(1.(interest))^(# of Compounds)
     
    So the $1, 20% interest, compound every 10 minutes for 6 months would be...
     
    1*1.2^25,920

 */
jQuery(document).ready(function($) {
  var body, quantity, errmsg, submit, amount, loan_question_title, loan_questionaire, final_quantity, compounds, original_loan_date, todays_date, day_diff, n, money, kaiji_reaction, credits;

  body = $('body');
  quantity = $('#quantity');
  errmsg = $('#errmsg');
  submit = $('#submit');
  loan_question_title = $('.loan_question_title');
  original_loan_date = $('#original_loan_date');
  money = $('.money');
  due = $('#due');
  amount_due = $('#amount_due');
  loan_questionaire = $('#loan_questionaire');
  kaiji_reaction = $('#kaiji_reaction .okay');
  kaiji_output = $('#kaiji_reaction .fuuu');
  credits = $('#credits');

  /* Courtesy dubroe https://github.com/dubroe/bootstrap-money-field*/
  $.fn.money_field = function(options) {
    var defaults = {
      width: null
    };
    var options = $.extend(defaults, options);
    
    return this.each(function() {
      obj = $(this);
      if(options.width)
        obj.css('width', options.width + 'px');
      obj.wrap("<div class='input-prepend'>");
      obj.before("<span class='add-on'>$</span>");
    });
  };
  money.money_field();

  //  Make the loan respond to datepicker
  original_loan_date.datepicker();

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

    if (original_loan_date.val().length === 0) {
      original_loan_date.addClass('alert-danger');
      return;
    } else if (original_loan_date.hasClass('alert-danger')) {
      original_loan_date.removeClass('alert-danger');
    }

    if (quantity.val().length === 0) {
      quantity.addClass('alert-danger');
      return;
    } else if (quantity.hasClass('alert-danger')) {
      quantity.removeClass('alert-danger');
    }

    //  Get todays date
    n = new Date();
    todays_date = (n.getMonth()+1) + '/';
    todays_date += n.getDate() + '/';
    todays_date += n.getFullYear();

    function parseDate(str) {
      var mdy = str.split('/');
      return new Date(mdy[2], mdy[0]-1, mdy[1]);
    }

    function daydiff(first, second) {
      return (second-first)/(1000*60*60*24);
    }

    day_diff = daydiff(parseDate(original_loan_date.val()), parseDate(todays_date));
    day_diff = ((day_diff*24*60)/6);

    compounds = (10 * day_diff); // Should be compand every 10 minutes from original loan date.
    console.log('quantity is ' + quantity.val());
    final_quantity = (quantity.val() * compounds);
    if ( !$.isNumeric(final_quantity) ) {
      console.log('this is not a number, what is this? ' + final_quantity);
    } else {
      final_quantity = final_quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    loan_questionaire.slideToggle( "slow", function() {
      amount_due
        .text('$'+final_quantity);
      due
        .addClass('black_outline')
        .slideToggle("slow");
      kaiji_reaction.hide();
      body.addClass('red');
      credits
        .addClass('white')
        .addClass('black_outline');
      kaiji_output.show();
    });
  });

});