import { type ResultSetHeader } from "mysql2";
import { conn2, database_api } from "../database/mysql-connection.ts";

    type resultQueryImage = { 
        link:string,
        id:number
    }
    type queryImage = { 
        id?:number, sku?:number, gallery?:string
    }
export class DataImages {

    private database = `\`${database_api}\``
    
    async findImageByparams ( query :queryImage  ):Promise<resultQueryImage[]>{

        const {gallery, id, sku } = query;

        let baseSql = ` SELECT gallery as link , id FROM ${this.database}.fotos_site_antigo`;
            const params = []
            const values = []

            const whereClause = ` WHERE `
            if(id){
                params.push(` id = ? ` )
                values.push(id);
            }       
            if(gallery){
                    params.push(` gallery = ? ` )
                values.push(gallery);
            }
             if(sku){
                    params.push(` sku = ? ` )
                values.push(sku);
            }
            
            
            if(params.length > 0 ){
                    baseSql +=   whereClause + params.join( ' AND ');  
                }

            const finalSQl = baseSql;

            const [ resultquery ]= await conn2.query(finalSQl, values );
                return resultquery as resultQueryImage[];
    }
async findImageNotlink ():Promise<resultQueryImage[]>{

        let finalSQl = ` SELECT gallery as link , id FROM ${this.database}.fotos_site_antigo WHERE link is null`;

            const [ resultquery ]= await conn2.query(finalSQl );
                return resultquery as resultQueryImage[];
    }


    async updateLinkByid(id:number,link:string ){
        const sql = `UPDATE ${this.database}.fotos_site_antigo set link = ? where id = ?;  `;
        const [resultUpdateImgLink ]  = await conn2.query(sql, [ link, id ]);
        return  resultUpdateImgLink as ResultSetHeader;
    }
}