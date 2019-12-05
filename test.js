let obj = {
  file1: { name: "file1123" },
  file2: { name: "file2243" },
  fil23: { name: "file3343" }
};

Object.values(obj).forEach(value=>{

  console.log(value.name);

})