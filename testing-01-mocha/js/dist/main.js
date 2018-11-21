import Events from './events.js';
import Loan from './loan.js'; // Connect the UI to the data.
// There are three actions to consider:
// a) the user creates a new loan by filling the form and clicking 'Add'
// b) the user chooses to view/edit an existing loan by clicking on one in the list
// c) the user chooses to clear the form by clicking 'Clear'
// 
// We can use the submit button to determine whether a new Loan should be created or
// an existing Loan should be updated by changing/checking the current innerHTML of the button
// (e.g. display Add to create and Save to make changes)

var form = document.querySelector('.loan-control>form'),
    // form access via
list = document.querySelector('.loan-display>.list-group'),
    // list access via
loans = [],
    // array to store Loan objects
currentLoan,
    // reference to the currently displayed loan
prop,
    // used to mixin observer support into loans array
// form submit handler
handleSubmit = function handleSubmit(e) {
  var loan; // determine if the form is displaying new or existing loan details

  if (!currentLoan) {
    // new loan, create a new Loan and add to the loans array
    // TODO: perform form validation before continuing
    currentLoan = new Loan({
      title: form.querySelector('#loan-title').value,
      principal: +form.querySelector('#loan-principal').value,
      rate: +form.querySelector('#loan-rate').value / 100,
      // convert to percentage
      term: +form.querySelector('#loan-term').value
    }); // display the payment

    form.querySelector('#loan-payment').innerHTML = "$".concat(currentLoan.payment()); // the loans list should update its display whenever a loan is changed

    currentLoan.on('change', renderLoansList); // add the loan to the list, which should also trigger the 'change' event

    loans.push(currentLoan); // currently in edit mode

    form.querySelector('button[type=submit]').innerHTML = 'Save';
  } else {
    // existing loan, populate the form
    // TODO: perform form validation before continuing
    currentLoan.set('title', form.querySelector('#loan-title').value);
    currentLoan.set('principal', +form.querySelector('#loan-principal').value);
    currentLoan.set('rate', +form.querySelector('#loan-rate').value / 100);
    currentLoan.set('term', +form.querySelector('#loan-term').value); // display the payment

    form.querySelector('#loan-payment').innerHTML = "$".concat(currentLoan.payment());
  }

  e.preventDefault();
},
    // reset the form and clear the currentLoan, if any
handleResetClick = function handleResetClick(e) {
  currentLoan = undefined;
  form.querySelector('#loan-payment').innerHTML = '$0.00';
  form.querySelector('button[type=submit]').innerHTML = 'Add';
},
    // list click handler
handleListClick = function handleListClick(e) {
  if (e.target.tagName === 'BUTTON') {
    // set the current loan and display in form 
    currentLoan = loans[e.target.dataset.idx]; // populate the form

    form.querySelector('#loan-title').value = currentLoan.get('title');
    form.querySelector('#loan-principal').value = currentLoan.get('principal');
    form.querySelector('#loan-rate').value = currentLoan.get('rate') * 100;
    form.querySelector('#loan-term').value = currentLoan.get('term'); // display the payment

    form.querySelector('#loan-payment').innerHTML = "$".concat(currentLoan.payment()); // update the submit button

    form.querySelector('button[type=submit]').innerHTML = 'Save';
  }
},
    // render the list
renderLoansList = function renderLoansList() {
  // use Handlebars to render the loans
  list.innerHTML = Handlebars.templates.loans({
    loans: loans
  });
}; // add observable support to the loans array


for (var _prop in Events.prototype) {
  loans[_prop] = Events.prototype[_prop];
} // update the push method of the loans array so that it now triggers a 'change' event


loans.push = function (loan) {
  // set the index for this newly added loan so that it can be tracked in the loans array
  loan.set('idx', this.length); // push the loan onto the array

  Array.prototype.push.call(this, loan); // update listeners that the array has been modified

  this.trigger('change');
}; // set all event listeners/observers required


loans.on('change', renderLoansList);
list.addEventListener('click', handleListClick);
form.addEventListener('submit', handleSubmit);
form.querySelector('button[type=reset]').addEventListener('click', handleResetClick);