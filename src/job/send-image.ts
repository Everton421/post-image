import { creaImageUploadService } from "../core/factories/upload-image-server.ts";
import { DataImages } from "../data/get-imgs.ts";
import { conn2 } from "../database/mysql-connection.ts";


    const dataImages = new DataImages();

    const allImagesDatabase = await dataImages.findImageNotlink();

         const sendImgage = creaImageUploadService();
    
         console.log(`processando ${allImagesDatabase.length} imagens...`) ;

    if(allImagesDatabase.length){

        for(const image of allImagesDatabase ){
            const resultPostImage = await sendImgage.postImg(image.link);

            if(resultPostImage){
                   const  resultUpdateLink   = await dataImages.updateLinkByid(image.id , resultPostImage);
                }
        }

    }



  