import { Body, Controller, Post } from "@nestjs/common";
import { PersonService } from "./persons.service";
import { CreatePersonDto } from "./dto";

@Controller('persons')
export class PersonsController {
    constructor(private personService: PersonService) {}

    @Post()
    createPerson(@Body() createPersonDto: CreatePersonDto) {
        return this.personService.createPerson(createPersonDto);
    }
}