// import { Controller, Get, Param, Post, Body, Patch, Query } from '@nestjs/common';

// @Controller('users')
// export class UsersController {

//     @Get() // GET /users or /users?role=value
//     findAll(@Query('name') name?) {
//         return user
//     }
//     @Get(':id') // GET /users/:id
//     findOne(@Param('id') id: string) {
//         return { id }
//     }
//     @Post() // POST /users 
//     create(@Body() user: {}) {
//         return user
//     }

//     @Patch(':id') // PATCH /users/:id
//     update(@Param('id') id: string, @Body() userUpdate: {}) {
//         return { id, ...userUpdate }
//     }
// }

import { Controller, Get, Param, Post, Body, Patch, Query } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  role?: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = []; // In-memory array to store user data

  @Get() // GET /users or /users?name=value
  findAll(@Query('name') name?: string) {
    if (name) {
      // Return users matching the query parameter 'name'
      return this.users.filter((user) => user.name === name);
    }
    return this.users; // Return all users if no query is provided
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id?: string) {
    // Find and return the user with the specified ID
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return { message: 'User not found' };
    }
    return user;
  }

  @Post() // POST /users
  create(@Body() user: User) {
    // Add a new user to the in-memory array
    this.users.push(user);
    return user;
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id') id: string, @Body() userUpdate: Partial<User>) {
    // Find the user and update their details
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return { message: 'User not found' };
    }
    this.users[userIndex] = { ...this.users[userIndex], ...userUpdate };
    return this.users[userIndex];
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
