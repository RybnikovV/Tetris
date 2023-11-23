const visualasingField = ({ field, filledAxisList }) => {
  return field.map((i, indexI) => {
    const isFilled = filledAxisList.find(rowIndex => rowIndex === indexI);
    return <div 
      className={isFilled ? 'tetris__row tetris__row_filled' : 'tetris__row'}
      key={`${indexI}`}>
      {
        i.map((j, indexJ) => {
          if (j) {
            return <div 
              className='tetris__item tetris__item_full' 
              key={`${indexI},${indexJ}`}></div>
          } else {
            return <div 
              className='tetris__item'
              key={`${indexI},${indexJ}`}></div>
          }
        })
      }
    </div>
  })
};

export default visualasingField;