export const useKeyUp = (e, fn, key = "enter") => {
  if (e.key.toLocaleLowerCase() === key) {
    e.preventDefault();
    fn();
  }
};
