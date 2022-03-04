// so i can forget that 0 is falsy! (0 || '') == ''
const defaultUndefined = (variable, defaultWhenUndefined) => {
  return typeof variable == 'undefined'? defaultWhenUndefined: variable;
}

export const specialSort = (firstEl, secondEl, toggleSort, sortBy) => {
  const statIndex = 'SPECIAL'.indexOf(sortBy);
  return generalStringSort(firstEl.special[statIndex], secondEl.special[statIndex], toggleSort);
}

export const nameSort = (firstEl, secondEl, toggleSort) => {
  const searchParam = toggleSort == 1? 'firstName': 'lastName';
  return generalStringSort(firstEl[searchParam], secondEl[searchParam], toggleSort);
}

export const generationSort = (firstEl, secondEl, toggleSort) => {
  return generalStringSort(
          defaultUndefined(firstEl.generation, '').toString(),
          defaultUndefined(secondEl.generation, '').toString(),
          toggleSort
        )
};

export const generalStringSort = (firstEl = '', secondEl = '', toggleSort) => {
  if(firstEl < secondEl) return -1 * toggleSort;
  if(firstEl > secondEl) return 1 * toggleSort;
  return 0;
}