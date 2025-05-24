import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role.model';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(@Body() role: Role): Promise<Role> {
    try {
      return await this.roleService.createRole(role);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getRole(@Param('id') id: string): Promise<Role> {
    try {
      return await this.roleService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllRoles(@Query('permission') permission?: string): Promise<Role[]> {
    try {
      if (permission) {
        return await this.roleService.findByPermission(permission);
      }
      return await this.roleService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() role: Partial<Role>
  ): Promise<Role> {
    try {
      return await this.roleService.updateRole(id, role);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<void> {
    try {
      await this.roleService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post(':id/permissions')
  async addPermission(
    @Param('id') id: string,
    @Body('permission') permission: string
  ): Promise<Role> {
    try {
      return await this.roleService.addPermission(id, permission);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id/permissions/:permission')
  async removePermission(
    @Param('id') id: string,
    @Param('permission') permission: string
  ): Promise<Role> {
    try {
      return await this.roleService.removePermission(id, permission);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
} 