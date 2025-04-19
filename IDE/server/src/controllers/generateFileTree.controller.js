import path from "path"
import fs from "fs/promises"


const generateFileTree = async (directory , language) => {
    const tree = {};

    let check1 , check2;
    if(language === "node") { 
      check1 = ".client"  
      check2 = "HtmlCssJs"
    }
    else if(language === "react") {
      check1 = ".server"
      check2 = "HtmlCssJs"
    }
    else if(language === "html" ) {
      check1 = ".server"
      check2 = ".client"
    }
    else {
      check1 = "HtmlCssJs"
      check2 = ""
    }

    async function fileTree(directory, currentTree) {
  
      const dirents = await fs.readdir(directory , {withFileTypes : true});
      // console.log(dirents);
      
      const files =  dirents.filter(dirent => dirent.name !== check1 && dirent.name !== check2);
      // console.log(files);
      for (const file of files) {
        const filePath = path.join(directory, file.name);
        const stat = await fs.stat(filePath);
        ///console.log(filePath);
        
  
        if (stat.isDirectory()) {
          currentTree[file.name] = {};
          await fileTree(filePath, currentTree[file.name]);
        } else {
          currentTree[file.name] = null;
        }
      }
    }
    await fileTree(directory, tree);
    return tree;
  };

  export { generateFileTree }
  