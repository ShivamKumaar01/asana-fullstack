import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TeamService {
  constructor(@InjectRepository(Team) private readonly teamRepository: Repository<Team>,private readonly userService:UserService,
@InjectRepository(User) private readonly userRepository: Repository<User>){}
  async create(createTeamDto: CreateTeamDto) {
    const team= new Team()
   
    team.name=createTeamDto.name
    const id=createTeamDto.userId
    const user=await this.userService.findOne(id)
    
    if(!user){
      throw new ConflictException("user with this id is not exist")
    }
    if(user.role=="admin"){
      throw new ConflictException("this is admin ")
    }
    if(user.role=="team-lead"){
       throw new ConflictException("this is already a team-lead ")
    }
    team.lead={id:createTeamDto.userId}as any
    user.role="team-lead"
    const value=await this.userService.update(user.id,{role:"team-lead"})
    console.log(value,"hellow");
 
    // await this.teamRepository.save(team)
    return {message:"team created successfully"};
   
  }

  findAll() {
    return this.teamRepository.find();
  }

  async findOne(name: string) {
    const team=await this.teamRepository.findOne({where:{name:name},relations:['lead']});
    if(!team){
      return new NotFoundException("team with this name is not exist")
    }
    return team
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
