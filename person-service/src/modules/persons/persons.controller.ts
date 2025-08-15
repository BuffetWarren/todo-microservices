import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { PersonService } from "./persons.service";
import { CreatePersonDto } from "./dto";
import { SearchQueryDto } from "./dto/search-query.dto";

@Controller('persons')
export class PersonsController {
    constructor(private personService: PersonService) { }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    createPerson(@Body() createPersonDto: CreatePersonDto) {
        return this.personService.createPerson(createPersonDto);
    }

    @Put(':id')
    async updatePerson(@Param('id', ParseIntPipe) id: number, @Body() updatePersonDto: CreatePersonDto) {
        return await this.personService.updatePerson(id, updatePersonDto);
    }

    @Delete('delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletePerson(@Param('id', ParseIntPipe) id: number) {
        const person = await this.personService.getPerson(id);
    }

    @Get(':id')
    async getPerson(@Param('id', ParseIntPipe) id: number) {
        return await this.personService.getPerson(id);
    }

    @Post('search-all')
    fetchAll(@Body() query: SearchQueryDto) {
        return this.personService.fetchAll(query);
    }


    @Post('search')
    async searchPersons(@Body() query: SearchQueryDto) {
        return await this.personService.searchPaginated(query);
    }
}