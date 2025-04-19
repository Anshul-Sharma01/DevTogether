import path from "path"
import fs from "fs/promises"


const generateFileTree = async (directory) => {
    const tree = {};
  
    async function fileTree(directory, currentTree) {
  
      const dirents = await fs.readdir(directory , {withFileTypes : true});
      const files =  dirents.filter(dirent => !dirent.name.startsWith('.'));
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
  