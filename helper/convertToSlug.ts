import unidecode from "unidecode";

export const convertToSlug = (text: string): string => {
    const unidecodeText = unidecode(text).trim();
    //trim() loại bỏ khoảng trắng đầu cuối
    const slug:string = unidecodeText.replace(/\s+/g,"-");

    return slug;
}