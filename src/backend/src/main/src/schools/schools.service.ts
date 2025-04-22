import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private schoolsRepository: Repository<School>,
  ) {}

  /**
   * Create a new school
   */
  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    const school = this.schoolsRepository.create(createSchoolDto);
    return this.schoolsRepository.save(school);
  }

  /**
   * Find all schools with optional active filter
   */
  async findAll(activeOnly?: boolean): Promise<School[]> {
    if (activeOnly !== undefined) {
      return this.schoolsRepository.find({
        where: { active: activeOnly },
        order: { name: 'ASC' },
      });
    }
    return this.schoolsRepository.find({
      order: { name: 'ASC' },
    });
  }

  /**
   * Find a school by ID
   */
  async findOne(id: string): Promise<School> {
    const school = await this.schoolsRepository.findOne({
      where: { id },
    });
    
    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }
    
    return school;
  }

  /**
   * Update a school
   */
  async update(id: string, updateSchoolDto: UpdateSchoolDto): Promise<School> {
    const school = await this.findOne(id);
    
    Object.assign(school, updateSchoolDto);
    
    return this.schoolsRepository.save(school);
  }

  /**
   * Remove a school (soft delete by setting active to false)
   */
  async remove(id: string): Promise<School> {
    const school = await this.findOne(id);
    
    school.active = false;
    
    return this.schoolsRepository.save(school);
  }
} 