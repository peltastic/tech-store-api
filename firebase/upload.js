// const storage = require("./");
// const { ref,uploadString, uploadBytes, getDownloadURL } = require("firebase/storage");
// const { v4 } = require("uuid");

// const generateImageUploadUrl = (productType, file) => {
//   if (!productType) {
//     return { error: "product type not specified" };
//   }
//   const imageId = v4();
//   let productImageRef;
//   if (productType === "phones") {
//     productImageRef = ref(storage, `phones/${imageId}`);
//   } else if (productType === "laptops") {
//     productImageRef = ref(storage, `laptops/${imageId}`);
//   } else {
//       return {error: "error"}
//   }
//   uploadBytes(productImageRef, file).then(() => {
//       return getDownloadURL(productImageRef)
//   })
//   // uploadBytes(productImageRef, file, 'base64').then((snapshot) => {
//   //   console.log('Uploaded a base64 string!');
//   //   return getDownloadURL(productImageRef)
//   // })
//   .then(url => {
//     return {error: false, url: url}
//   })
// };

// module.exports = {generateImageUploadUrl}