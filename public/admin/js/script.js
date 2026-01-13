//upload image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const buttonClose = uploadImage.querySelector("[button-close-image]");
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (e) => {
    console.log(e);
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(e.target.files[0]); //set src cho image,
      // gán giá trị ảnh từ input vào ô image
    }
    console.log(uploadImageInput.value);
    if (uploadImageInput.value) {
      buttonClose.setAttribute("class", "btn btn-primary");
    }
  });
  buttonClose.addEventListener("click", () => {
    uploadImageInput.value = "";
    uploadImagePreview.src = "";
    buttonClose.setAttribute("class", "d-none");
  })
}
//end upload image

//upload audio
const uploadAudio = document.querySelector("[upload-audio]");
if (uploadAudio) {
  const buttonClose = uploadAudio.querySelector("[button-close-audio]");
  const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
  const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
  const source = uploadAudio.querySelector("source");

  uploadAudioInput.addEventListener("change", (e) => {
    console.log(e);
    const file = e.target.files[0];
    if (file) {
      source.src = URL.createObjectURL(e.target.files[0]); //set src cho source,
      // gán giá trị audio từ input vào ô uploadAudioPlay
      uploadAudioPlay.load();//gọi hàm load() để load được file source
    }
    
    if (uploadAudioInput.value) {
      buttonClose.setAttribute("class", "btn btn-primary");
    }
  });
  buttonClose.addEventListener("click", () => {
    uploadAudioInput.value = "";
    uploadAudioPlay.src = "";
    buttonClose.setAttribute("class", "d-none");
  })
}
//end upload audio