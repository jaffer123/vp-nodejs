const MediaService = require('../services/mediaService');

exports.saveMedia = async function (req, res, next) {
    try {
        let data = req.body
        let saveMedia = await MediaService.saveMedia(data);
        return res.status(200).json({status: 200, flag: true ,data: {saveMedia}, message: "Successfully Save Media"});
    } catch (e) {
        return res.status(200).json({status: 200, flag: false ,message: e.message});
    }
}

exports.getMedia = async function (req, res, next) {
    try {
        let id = req.params.id
        let media = await MediaService.getMedia(id);
        return res.status(200).json({status: 200, flag: true ,data: {media}, message: "Successfully Save Media"});
    } catch (e) {
        return res.status(200).json({status: 200, flag: false ,message: e.message});
    }
}

exports.getMediaAll = async function (req, res, next) {
    try {
        let mediaAll = await MediaService.getMediaAll();
        return res.status(200).json({status: 200, flag: true ,data: {mediaAll}, message: "Successfully Get Media All"});
    } catch (e) {
        return res.status(200).json({status: 200, flag: false ,message: e.message});
    }
}

exports.updateMedia = async function (req, res, next) {
    try {
        let data = req.body
        let media = await MediaService.updateMedia(data);
        return res.status(200).json({status: 200, flag: true ,data: {media}, message: "Successfully Update Media"});
    } catch (e) {
        return res.status(200).json({status: 200, flag: false ,message: e.message});
    }
}

exports.deleteMedia = async function (req, res, next) {
    try {
        let id = req.params.id
        let deleteStatus = await MediaService.deleteMedia(id);
        return res.status(200).json({status: 200, flag: true ,data: {deleteStatus}, message: "Successfully Delete Media"});
    } catch (e) {
        return res.status(200).json({status: 200, flag: false ,message: e.message});
    }
}