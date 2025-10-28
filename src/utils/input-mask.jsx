const inputMask = (type, e, editValue) => {
  
  
  if (type === "alphaNumerical") {
    if (e) {
      const { value } = e.target;
      const temp = value;
      const x = temp.replace(/[^a-zA-Z0-9 ]/g, "");
      return x;
    }
  }
  
  if (type === "onlyAlphabets") {
    if (e) {
      const { value } = e.target;
      const temp = value;
      const x = temp.replace(/[^a-zA-Z]/g, "");
      return x;
    }
  }
  
  if (type === "onlyNumbers") {
    if (e) {
      const { value } = e.target;
      const temp = value;
      const x = temp.replace(/[^\d.-]/g, "");
      return x;
    }
    if (editValue) {
      const temp = editValue;
      const x = temp.replace(/[^\d.-]/g, "");
      return x;
    }
  }
  
};
  
export default inputMask;
  