// Contains all the filter functions

const allFilterFunctions = {
  transactionStatus: {
    Completed: () => true,
    Pending: row => row.status === 'completed',
    Rejected: row => row.status === 'rejected',
  },
  transactionType: {
    All: () => true,
    Send: (row, currentUser) => row.fromUser === currentUser,
    Received: (row, currentUser) => row.toUser === currentUser,
  },
  contacts: (row, _, currentContact) =>
    console.log('contact: ', currentContact) || (row.toUser === currentContact || row.fromUser === currentContact),
};

// *************
// dummy code to test algorithm
//
// const somObject = {
//   transactionStatus: {
//     completed: value => value,
//   },
//   contacts: value => value,
// };

// const objectChooser = (firstIndex, secondIndex) =>
//   (somObject[firstIndex][secondIndex] || somObject[firstIndex]);

// const returnFunct = objectChooser('contacts', 'something');
// console.log(returnFunct(1));

// **************

const functionChooser = (tableType, tableTab) => 
  // console.log(tableType, tableTab);
   (allFilterFunctions[tableType][tableTab] || allFilterFunctions[tableType])
;


module.exports = functionChooser;

