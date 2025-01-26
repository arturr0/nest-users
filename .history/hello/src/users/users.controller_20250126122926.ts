import { Controller, Get, Param, Post, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get(':id') // GET /users/:id
    findOne(@Param('id') id: string) {
        return { id }
    }
    @Post() // POST /users 
    create(@Body() user: {}) {
        return user
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id') id: string, @Body() userUpdate: {}) {
        return { id, ...userUpdate }
    }
}

// @Controller('users')
// export class UsersController {
//   private ids: string[] = []; // Class-level array to store IDs

//   @Get(':id') // GET /users/:id
//   findOne(@Param('id') id: string) {
//     this.ids.push(id); // Add the ID to the array
//     return this.ids; // Return the array of IDs
//   }
// }
