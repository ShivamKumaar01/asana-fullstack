import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { Or, Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(@InjectRepository(Organization) private readonly orgRepository:Repository<Organization>){}
  async create(createOrganizationDto: CreateOrganizationDto) {
    const organization=new Organization()
    organization.name=createOrganizationDto.name
    const existOrg=await this.find(createOrganizationDto.name)
    if(existOrg){
      throw new Error('Organization already exists')
    }
    else{
      await this.orgRepository.save(organization)
    }

    
    return {message:"organization created successfully"};
  }

  findAll() {
    return `This action returns all organization`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organization`;
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
  find(name:string){
    return this.orgRepository.findOne({where:{name:name}})
  }
}
