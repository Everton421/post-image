import axios from "axios";
import { validateBase64 } from "../../utils/validate-base64.ts";
import { type ImgProvider } from "../ports/imgProviders.ts";

export class ImgBB implements ImgProvider {
upload(image: string): Promise<string | null> {
    
    return new Promise( async (resolve, reject)=>{
     let base64Input = image;
            const result = validateBase64(base64Input);
        if (!result.imageDetection.isImage) {
            console.log(`Não é uma imagem. Formato detectado: ${result.imageDetection.format}`);
            return
        } 

  let base64Clean = String(base64Input);
        if (base64Clean.includes('base64,')) {
            base64Clean = base64Clean.split('base64,')[1];
        }
            if(!process.env.API_KEY_IMGBB){
                console.log(" API_KEY_IMGBB não foi configurada.")
                return;
            }

            const apiKey = process.env.API_KEY_IMGBB

        const form = new FormData();
        form.append('image', base64Clean);
    
        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, form);
            resolve(response.data.data.url);
        } catch (error:any) {
            reject(error);
        }


})

}

}