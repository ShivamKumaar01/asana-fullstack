import { IsArray, IsNumber } from "class-validator";
import { Project } from "src/project/entities/project.entity";
import { TeamMember } from "src/team-member/entities/team-member.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string

    // @Column()
    // createdBy:number
    @ManyToOne(()=>User,(user)=>user.leads)
    lead:User

    @OneToMany(()=>Project,(project)=>project.teams)
    projects:Project[]


   
    @OneToMany(()=>TeamMember,(teammember)=>teammember.team)
    members:TeamMember[]

    




}
