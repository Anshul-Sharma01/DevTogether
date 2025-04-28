import { Router } from "express";
import fs from "fs/promises"
import { generateFileTree } from "../controllers/generateFileTree.controller.js";
import Docker from "dockerode"

const docker = new Docker({ socketPath: '/var/run/docker.sock' })
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

router.route("/stop-collab/:date").post(async (req, res) => {
    try {
      const { date } = req.params;
      console.log(date);
  
      await stopContainer(`frontend-${date}`);
      await stopContainer(`user-${date}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await stopContainer(`backend-${date}`);
  
      res.status(200).send("Stopped containers");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error stopping containers");
    }
  });
  
  async function stopContainer(containerName) {
    try {
      const container = docker.getContainer(containerName);
      await container.stop();
      console.log(`Stopped ${containerName}`);
    } catch (err) {
      console.error(`Failed to stop ${containerName}:`, err);
      throw err;
    }
  }
  


export default router;