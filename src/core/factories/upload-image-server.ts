import { FreeImageHost } from "../providers/free-image-host.ts";
import { ImgBB } from "../providers/imgbb.ts";
import {imageUploadService } from "../services/post-img-service.ts";

export function creaImageUploadService(): imageUploadService{
return new imageUploadService([
    new FreeImageHost(),
    new ImgBB(), 
])
}