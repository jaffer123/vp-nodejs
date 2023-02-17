const S3Service = require('../services/s3Service');
const formidable = require('formidable');

exports.uploadS3 = async function (req, res, next) {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            if (err) return res.redirect(303, '/error');
            let folderPath = 'media';
            let type = files.media.mimetype.split("/");
            let originalFilename = files.media.originalFilename
            let mediaType = originalFilename.split(".")[1];
            let filename = type[0] + "-" + new Date().getTime() + "." + mediaType;
            let file = {
                "path": files.media.filepath,
                "fileName": folderPath + "/" + filename,
                "fileSize": files.media.size,
                "folderPath": folderPath
            }
            result = await S3Service.uploadToS3(file);

            result = { "ETag": result.ETag, "Location": result.Location, "Key": result.Key, "key": result.key };
            return res.status(200).json({ status: 200, flag: true, data: { 'result': result }, message: "Successfully media upload" })
        });
    } catch (e) {
        return res.status(200).json({ status: 200, flag: false, message: e.message });
    }
}

exports.viewS3 = async function (req, res, next) {
    try {
        let key = req.body.key
        console.log(key)
        const readStream = S3Service.viewS3(key);
        readStream.on('error', function (error) {
            return res.status(404).json({ status: 404, flag: false, message: error.message })
        })
        readStream.pipe(res);
    } catch (e) {
        return res.status(200).json({ status: 200, flag: false, message: e.message });
    }
}