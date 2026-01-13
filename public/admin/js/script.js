//upload image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage){
  const buttonClose = uploadImage.querySelector("[button-close-image]");
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change",(e) => {
    console.log(e);
    const file = e.target.files[0];
    if(file){
      uploadImagePreview.src=URL.createObjectURL(file);//set src cho image,
       // gán giá trị ảnh từ input vào ô image
    }
    console.log(uploadImageInput.value);
    if(uploadImageInput.value){
    buttonClose.setAttribute("class","btn btn-primary");
    }
  });
  buttonClose.addEventListener("click",()=>{
    uploadImageInput.value="";
    uploadImagePreview.src="";
    buttonClose.setAttribute("class","d-none");
  })
}
//end upload image