import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePersonDto } from "./dto";
import { PaginatedResponse, SearchQueryDto } from "./dto/search-query.dto";

@Injectable()
export class PersonService {
    person: PrismaClient["person"];
    constructor(private prisma: PrismaService) {
        this.person = prisma.person;
    }

    async createPerson(data: CreatePersonDto) {
        return await this.person.create({ data });
    }


    async updatePerson(id: number, data: CreatePersonDto) {
        return await this.person.update({
            where: { id },
            data,
        });
    }

    async deletePerson(id: number) {
        return await this.person.delete({
            where: { id },
        });
    }


    // async getPerson(id: number) {
    //     return await this.person.findUnique({
    //         where: { id },
    //     });
    // }

    async fetchAll(query: SearchQueryDto) {
        const { search, limit = 10, sortBy = 'createdAt', orderBy = 'desc' } = query;
        const searchCondition = search ? {
            OR: [
                { email: { contains: search, mode: 'insensitive' as const } },
                { name: { contains: search, mode: 'insensitive' as const } },
            ],
        } : {};

        const orderCondition = {
            [sortBy]: orderBy
        };

        const validatedLimit = Math.min(Math.max(limit, 1), 100);

        // Exécution parallèle des requêtes
        const [data] = await Promise.all([
            this.person.findMany({
                where: searchCondition,
                orderBy: orderCondition,
                take: validatedLimit,
            }),
        ]);
        return data;
    }

    
     async searchPaginated(query: SearchQueryDto): Promise<PaginatedResponse<any>> {
        const { search, page = 1, limit = 10, sortBy = 'createdAt', orderBy = 'desc' } = query;
        
        // Validation supplémentaire côté service
        const validatedLimit = Math.min(Math.max(limit, 1), 100);
        const validatedPage = Math.max(page, 1);
        const skip = (validatedPage - 1) * validatedLimit;

        // Construction de la condition de recherche
        const searchCondition = search ? {
            OR: [
                { email: { contains: search, mode: 'insensitive' as const } },
                { name: { contains: search, mode: 'insensitive' as const } },
            ],
        } : {};

        // Construction de l'ordre de tri
        const orderCondition = {
            [sortBy]: orderBy
        };

        // Exécution parallèle des requêtes
        const [data, total] = await Promise.all([
            this.person.findMany({
                where: searchCondition,
                orderBy: orderCondition,
                skip,
                take: validatedLimit,
            }),
            this.person.count({
                where: searchCondition,
            })
        ]);

        const totalPages = Math.ceil(total / validatedLimit);
        
        return {
            data,
            pagination: {
                page: validatedPage,
                limit: validatedLimit,
                total,
                totalPages
            },
        };
    }

}