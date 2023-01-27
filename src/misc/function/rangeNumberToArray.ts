const rangeNumberToArray = (initial: number, final: number): Array<number> => {
  
  let itens: Array<number> = [];
  
  if (initial < final) {
    for (let i = initial; i <= final; i++) {
      itens.push(i);
    }
  } else {
    for (let i = initial; i <= final; i--) {
      itens.push(i);
    }
  }
  
  return itens;
}

export default rangeNumberToArray;