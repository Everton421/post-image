import axios from "axios";
import { validateBase64 } from "../../utils/validate-base64.ts";
import { type ImgProvider } from "../ports/imgProviders.ts";

export class FreeImageHost implements ImgProvider{

  async  upload(image: string): Promise<string | null> {
        
        let base64Input = image;
        let key = process.env.API_KEY_FREEIMGHOST!;

    if (image.startsWith('http://') || image.startsWith('https://')) {
        console.log('URL detectada, baixando imagem...');
        const response = await axios.get(image, { responseType: 'arraybuffer' });
        base64Input = Buffer.from(response.data).toString('base64');
    }

            const result = validateBase64(base64Input);
            if (!result.imageDetection.isImage) {
                console.log(`Não é uma imagem. Formato detectado: ${result.imageDetection.format}`);
                return null;
            }

        let base64Clean = String(image);

        if (base64Clean.includes('base64,')) {
            base64Clean = base64Clean.split('base64,')[1];
        }
        const params = new URLSearchParams();
        params.append('key', key);
        params.append('source', base64Clean); // Envia a string limpa
        params.append('format', 'json');

        try {
            console.log("Iniciando upload para FreeImage.host...");
            const response = await axios.post('https://freeimage.host/api/1/upload', params);

            if (response.data && response.data.image && response.data.image.url) {
                console.log('Upload realizado com sucesso:', response.data.image.url);
                return response.data.image.url;
            } else {
                throw new Error("Retorno inesperado da API de Imagem");
            }

        } catch (error: any) {
            console.error('Erro no upload FreeImage:', error.response?.data || error.message);
            throw new Error('Falha ao fazer upload da imagem: ' + (error.response?.data?.error?.message || error.message));
        }
    }
}