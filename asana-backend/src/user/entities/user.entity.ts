
import { Organization } from "src/organization/entities/organization.entity";
import { Project } from "src/project/entities/project.entity";
import { TeamMember } from "src/team-member/entities/team-member.entity";
import { Team } from "src/team/entities/team.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar" })
  name: string

  @Column({ type: "varchar", unique: true })
  email: string

  @Column({ type: "varchar" })
  password: string


  @Column({ type: 'enum', enum: ['admin', 'user', 'team-lead'] })
  role: string;


  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(()=>Organization,(organization)=>organization.users)
  organization:Organization

  @OneToMany(()=>Team,(team)=>team.lead)
  leads:Team[]

  @OneToMany(()=>Project,(project)=>project.leads)
  project:Project[]


  @OneToMany(()=>TeamMember,(teammember)=>teammember.user)
  members:TeamMember[]




}

