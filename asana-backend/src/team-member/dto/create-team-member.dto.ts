import { IsArray, IsInt, IsNumber } from "class-validator";

export class CreateTeamMemberDto {

    @IsInt()
    teamID: number

    @IsArray()
    @IsNumber({}, { each: true })
    userId: number[];
}
