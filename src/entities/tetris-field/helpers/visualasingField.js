const visualasingField = (field) => {
  return field.map((i, indexI) => {
    return <div 
      className='tetris__row' 
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