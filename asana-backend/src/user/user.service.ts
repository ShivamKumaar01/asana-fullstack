import { ConflictException, Injectable, Query, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/organization/entities/organization.entity';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { loginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService) { }
  async create(createUserDto: CreateUserDto) {
    const user = new User()
    user.name = createUserDto.name
    const email = createUserDto.email
    const exist = await this.findByEmail(email)
    if (exist) {
      throw new ConflictException('this email is  already exists');
    }
    user.email=createUserDto.email

    const password = createUserDto.password
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword
    user.role = createUserDto.role
    user.organization = { id: createUserDto.orgID } as any

    await this.userRepository.save(user)
    return { message: "either user or admin is registerd" };
  }

  findAll() {
    return this.userRepository.find();
  }

  async finduser(){
    const user=await this.userRepository.find({where:{role:'user'}})
    return user;
  }

   async findadmin(){
    const user=await this.userRepository.find({where:{role:'admin'}})
    return user;
  }

  findOne(id: number) {
    return this.userRepository.findOne({where:{id:id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({id},{...updateUserDto});
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } })
  }

  async login(loginUserDto: loginUserDto) {
    if(loginUserDto.role=="admin"){
    const user = await this.findByEmail(loginUserDto.email)
     if(user?.role!="admin"){
      throw new UnauthorizedException('you are not a valid admin')
     }
    if (!user) {
      throw new UnauthorizedException('invalid email or password')
    }
    const isValidPassword = await bcrypt.compare(loginUserDto.password, user.password)
    if (!isValidPassword) {
      throw new UnauthorizedException('invalid email or password')
    }
    
      const payload = { sub: user.id, useremail: user.email };

      const token = this.jwtService.sign(payload, {
        secret: process.env.SECRET,
        expiresIn: '1h'
      });
      return {message:"admin login successfully", details: token, user };
    

    }
    if(loginUserDto.role=="user"){

     const user = await this.findByEmail(loginUserDto.email)
     if(user?.role!="user"){
      throw new UnauthorizedException('you are not a valid user')
     }
    if (!user) {
      throw new UnauthorizedException('invalid email or password')
    }
    const isValidPassword = await bcrypt.compare(loginUserDto.password, user.password)
    if (!isValidPassword) {
      throw new UnauthorizedException('invalid email or password')
    }
    
      const payload = { sub: user.id, useremail: user.email };

      const token = this.jwtService.sign(payload, {
        secret: process.env.SECRET,
        expiresIn: '1h'
      });
      return {message:"user login successfully", details: token, user };
    

    }
    if(loginUserDto.role=="team-lead"){

    const user = await this.findByEmail(loginUserDto.email)
     if(user?.role!="user"){
      throw new UnauthorizedException('you are not a valid team-lead')
     }
    if (!user) {
      throw new UnauthorizedException('invalid email or password')
    }
    const isValidPassword = await bcrypt.compare(loginUserDto.password, user.password)
    if (!isValidPassword) {
      throw new UnauthorizedException('invalid email or password')
    }
   
      const payload = { sub: user.id, useremail: user.email };

      const token = this.jwtService.sign(payload, {
        secret: process.env.SECRET,
        expiresIn: '1h'
      });
      return {message:"user login successfully", details: token, user };
    

    }
    else{
      throw new UnauthorizedException('Invalid role')
    }
    

  }
}
