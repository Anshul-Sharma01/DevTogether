import { Router } from "express";
import fs from "fs/promises"
import { generateFileTree } from "../controllers/generateFileTree.controller.js";

const router = Router()

router.route("/file-path").get(async (req,res) => {
    const { language } = req.query
    // console.log(language);
    
    const file = await generateFileTree("./user", language)
    
    res.json({tree:file})
})

router.route("/file-content").get(async(req, res) => {
    const {path} = req.query;
    const content = await fs.readFile(`./user/${path}`, "utf-8")
    res.json({content})
})

router.route("/file-content/htmlcssjs").get(async(req,res) => {
    const html = await fs.readFile('./user/HtmlCssJs/index.html', "utf-8")
    const css = await fs.readFile('./user/HtmlCssJs/style.css', "utf-8")
    const js = await fs.readFile('./user/HtmlCssJs/script.js', "utf-8")

    res.json({
        html,css,js
    })
})


// router.route("/user-url").get(async(req,res) => {
//     const { clientRoomId } = req.query;

//     const collab = await Collab.findOne({roomId:clientRoomId})

//     let name = collab?.userContainerName;
//     res.json({
//         name
//     })

// })


export default router;