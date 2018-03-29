
const restructuredData = (header, data) => {
  const sequence = header.map((elem) => {
    // console.log('elem: ', elem);
    switch (elem) {
      case 'Sent To':
        return 'toUser';
      case 'Sent By':
        return 'fromUser';
      case 'Amount':
        return 'amount';
      case 'Status':
        return 'status';
      case 'Category':
        return 'category';
      case 'Reason':
        return 'reason';
      default:
        return null;
    }
  });

  // console.log('sequence: ', sequence);
  // console.log('data: ', data);
  const newData = Object.keys(data).map((rowIndex) => {
    // console.log(data[rowIndex]);
    const filteredRow = {};
    sequence.map((elem) => {
      filteredRow[elem] = data[rowIndex][elem];
    });
    filteredRow.transactionId = data[rowIndex].transactionId;
    // console.log('filteredRow: ', filteredRow);
    return filteredRow;
  });
    //   return newData;
  return newData;
};

export default restructuredData;
