import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProviderService } from './service/provider.service';
import { CreateProviderDto } from './dtos/create-provider.dto';

@Controller('providers')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
  }

  @Get('/:id')
  getProviderProfile(@Param('id') id: string) {
    return this.providerService.getByProviderId(id);
  }
}
