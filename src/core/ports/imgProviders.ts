export interface ImgProvider { 
    upload(image:string):   Promise<string | null> 
}