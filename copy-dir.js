const fs = require("fs-extra");
const listFolderCopy = [
    {
        sourceDirectory:"views",
        targetDirectory:"dist/views"
    },
    {
        sourceDirectory:"public",
        targetDirectory:"dist/public"
    }
];
listFolderCopy.forEach(item=>{
    fs.copy(item.sourceDirectory,item.targetDirectory,(err)=>{
        if(err){
            console.error(`lỗi sao chép thư mục ${item.sourceDirectory}:`,err);
        }
        else {
            console.log(`sao chép thành công thư mục ${item.targetDirectory}`);
        }
    })
})