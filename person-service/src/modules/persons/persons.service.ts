import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePersonDto } from "./dto";

@Injectable()
export class PersonService {
    person: PrismaClient["person"];
    constructor(private prisma: PrismaService) {
        this.person = prisma.person;
    }

    async createPerson(data: CreatePersonDto) {
        return await this.person.create({ data });
    }

}