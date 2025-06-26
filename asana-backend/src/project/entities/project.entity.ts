import { Team } from "src/team/entities/team.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @ManyToOne(()=>User,(user)=>user.project)
    leads:User

    @ManyToOne(()=>Team,(team)=>team.projects)
    teams:Team

}
