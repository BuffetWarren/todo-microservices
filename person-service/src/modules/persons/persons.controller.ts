import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { PersonService } from "./persons.service";
import { CreatePersonDto } from "./dto";
import { SearchQueryDto } from "./dto/search-query.dto";

@Controller('persons')
export class PersonsController {
    constructor(private personService: PersonService) { }

    @Post('create')
    createPerson(@Body() createPersonDto: CreatePersonDto) {
        createPersonDto.name = createPersonDto.name.trim();
        createPersonDto.email = createPersonDto.email.trim();
        return this.personService.createPerson(createPersonDto);
    }

    @Put(':id')
    updatePerson(@Param('id') id: number, @Body() updatePersonDto: CreatePersonDto) {
        updatePersonDto.name = updatePersonDto.name.trim();
        updatePersonDto.email = updatePersonDto.email.trim();
        return this.personService.updatePerson(id, updatePersonDto);
    }

    @Post('delete/:id')
    deletePerson(@Param('id') id: number) {
        return this.personService.deletePerson(id);
    }

    // @Post(':id')
    // getPerson(@Param('id') id: number) {
    //     return this.personService.getPerson(id);
    // }

    @Post('search-all')
    fetchAll(@Body() query: SearchQueryDto) {
        return this.personService.fetchAll(query);
    }


    @Post('search')
    async searchPersons(@Body() query: SearchQueryDto) {
        return await this.personService.searchPaginated(query);
    }
}