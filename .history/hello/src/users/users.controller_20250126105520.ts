import { Controller, Get, Param } from '@nestjs/common';

// @Controller('users')
// export class UsersController {
//     @Get(':id') // GET /users/:id
//     findOne(@Param('id') id: string) {
//         return { id }
//     }
// }

@Controller('users')
export class UsersController {
  private ids: string[] = []; // Class-level array to store IDs

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    this.ids.push(id); // Add the ID to the array
    return this.ids; // Return the array of IDs
  }
}
