import { Team } from "src/team/entities/team.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TeamMember {
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>Team,(team)=>team.members)
    team:Team


    @ManyToOne(()=>User,(user)=>user.members)
    user:User
}
