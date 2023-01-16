
const fs = require('fs');

exports.uploadImage = async function(imgString){
    try{
        const imgSavePath = '/users/';
        const root_path = require('path').resolve('public');
        const imagePath = root_path + imgSavePath;
        let type = ((imgString.split(";")[0]).split(":")[1]).split("/")
        imgString = imgString.replace(/^data:(.*?);base64,/, "");
        imgString = imgString.replace(/ /g, '+');
        const mediaName = type[0]+"-"+ new Date().getTime()+"."+type[1];
        const path = imagePath + mediaName;
        fs.writeFile(path, imgString,'base64', () => console.log('finished downloading!',path));
        return (imgSavePath + mediaName).replace(/^\/|\/$/g, '') ;
    }catch(e){
        throw Error('Error in Create Review',e);
    }
}

exports.percentageCal = async function(value,total){
    try{
        return  ((100 * value) / total).toFixed() ;
    }catch(e){
        throw Error('Error in percentage calculation',e);
    }
}