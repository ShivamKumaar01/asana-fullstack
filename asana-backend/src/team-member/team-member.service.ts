import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from './entities/team-member.entity';
import { User } from 'src/user/entities/user.entity';
import { Team } from 'src/team/entities/team.entity';

@Injectable()
export class TeamMemberService {
   constructor(@InjectRepository(TeamMember) private readonly teamMemberRepository: Repository<TeamMember>,
   @InjectRepository(User) private readonly userRepository: Repository<User>) { }
  async create(createTeamMemberDto: CreateTeamMemberDto) {
    const{teamID,userId}=createTeamMemberDto
    const users=await this.userRepository.findByIds(userId);
    if(users.length!==userId.length){
      throw new NotFoundException("one or more user is not found ")
    }
    const teamMember=new TeamMember()
    teamMember.team={id:createTeamMemberDto.teamID}as any
    // teamMember.user=users
    // const members=this.teamMemberRepository.create({team:teamID,user:users})



    return 'This action adds a new teamMember';
  }

  findAll() {
    return `This action returns all teamMember`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamMember`;
  }

  update(id: number, updateTeamMemberDto: UpdateTeamMemberDto) {
    return `This action updates a #${id} teamMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamMember`;
  }
}
