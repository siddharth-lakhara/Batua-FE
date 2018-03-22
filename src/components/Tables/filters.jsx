// Contains all the filter functions

const allFilterFunctions = {
  transactionStatus: {
    Completed: row => row.status === 'COMPLETED',
    Pending: row => row.status === 'PENDING',
    Rejected: row => row.status === 'REJECTED',
  },
  transactionType: {
    All: () => true,
    Send: (row, currentUser) => row.fromUser === currentUser,
    Received: (row, currentUser) => row.toUser === currentUser,
  },
  contacts: {
    Send: (row, currentUser, currentContact) => (row.toUser === currentContact),
    Receive: (row, currentUser, currentContact) => (row.fromUser === currentContact),
  },
};

const functionChooser = (tableType, tableTab) =>
  // console.log('In Filters: ', tableType, tableTab);
  (allFilterFunctions[tableType][tableTab] || allFilterFunctions[tableType]);
module.exports = functionChooser;


// *************
// dummy code to test algorithm

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

