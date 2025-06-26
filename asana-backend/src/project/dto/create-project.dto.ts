import { IsInt, IsString } from "class-validator";

export class CreateProjectDto {
    @IsString()
    name:string
    @IsInt()
    lead:number
    @IsInt()
    teamId:number
    

}
