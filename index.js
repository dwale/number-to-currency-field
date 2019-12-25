function formatNumber(n) {
  // regex for formatting number to currency form
     // add commas to number
    // remove all non-digits
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};


function formatPrice( e, blur) {
//get value from input field
    let input = document.getElementById("format-field");

  // check current state of value in input and event object passed
    console.log('second', input.value);
      console.log('event', e);

  let input_val = input.value;
  
  // if input is empty , return ;
  if (input_val === "") { return; }
  
  // check current length of input field
  let original_len = input_val.length;

  // check cursor position 
  let cursor_pos = e.target.selectionStart;
  console.log(cursor_pos);
  
  
  //Now lets handle the the input field when a decimal has been entered
    
  // check for decimal
  if (input_val.indexOf(".") >= 0) {
    // get position of first decimal
    console.log('decimal pos', input.value);
    let decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    let left_side = input_val.substring(0, decimal_pos);
    let right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);
    
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }
    
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "₦" + left_side + "." + right_side;

  } else {
    // no decimal entered
    input_val = formatNumber(input_val);
    input_val = "₦" + input_val;
    
    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }
  
  // return updated string to input
  input.value = input_val;
  // put cursor back in the right position
  let updated_len = input_val.length;
  cursor_pos = updated_len - original_len + cursor_pos;
  input.setSelectionRange(cursor_pos, cursor_pos);
}
