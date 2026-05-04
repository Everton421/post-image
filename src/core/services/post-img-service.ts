import {type ImgProvider } from "../ports/imgProviders.ts";
 
export class imageUploadService {
    private providers : ImgProvider[];

    constructor(   providers: ImgProvider[]){
        this.providers = providers;
    }

    async postImg(image: string):Promise<string | null>{
        for(const provider of this.providers){
            const result = await provider.upload(image);
            if(result) return result;
        }

        return null
    }
}
