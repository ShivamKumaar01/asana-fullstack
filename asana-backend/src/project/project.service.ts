import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProjectService {
  constructor(@InjectRepository(Project) private readonly projectRepository: Repository<Project>,private readonly userService:UserService){}
  async create(createProjectDto: CreateProjectDto) {
    const project=new Project()
    project.name=createProjectDto.name
    const leadId=createProjectDto.lead
    const user=await this.userService.findOne(leadId)
    if(!user){
      return new NotFoundException("lead with this id is not found")
    }
    if(user.role=="team-lead"){
      project.leads={id:createProjectDto.lead}as any
      project.teams={id:createProjectDto.teamId}as any
      await this.projectRepository.save(project)
      return {message:"project creaeted successfully"}

    }
    else{
      return new NotFoundException("user with this id not a team-lead")
    }


    
    
  }

  findAll() {
    return this.projectRepository.find();
  }

  findOne(id: number) {
    return this.projectRepository.findOne({where:{id:id},relations:['team']});
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update({id},{...updateProjectDto});
  }

  remove(id: number) {
    return this.projectRepository.delete(id);
  }
}
