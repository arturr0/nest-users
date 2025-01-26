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

// import { Controller, Get, Param, Post, Body, Patch, Delete, Query } from '@nestjs/common';

// interface User {
//   id: string;
//   name: string;
//   role?: string;
// }

// @Controller('users')
// export class UsersController {
//   private users: User[] = []; // In-memory array to store user data

//   @Get() // GET /users or /users?name=value
//   findAll(@Query('name') name?: string) {
//     if (name) {
//       // Return users matching the query parameter 'name'
//       return this.users.filter((user) => user.name === name);
//     }
//     return this.users; // Return all users if no query is provided
//   }

//   @Get(':id') // GET /users/:id
//   findOne(@Param('id') id: string) {
//     // Find and return the user with the specified ID
//     const user = this.users.find((user) => user.id === id);
//     if (!user) {
//       return { message: 'User not found' };
//     }
//     return user;
//   }

//   @Post() // POST /users
//   create(@Body() user: User) {
//     // Add a new user to the in-memory array
//     this.users.push(user);
//     return user;
//   }

//   @Patch(':id') // PATCH /users/:id
//   update(@Param('id') id: string, @Body() userUpdate: Partial<User>) {
//     // Find the user and update their details
//     const userIndex = this.users.findIndex((user) => user.id === id);
//     if (userIndex === -1) {
//       return { message: 'User not found' };
//     }
//     this.users[userIndex] = { ...this.users[userIndex], ...userUpdate };
//     return this.users[userIndex];
//   }

//   @Delete(':id') // DELETE /users/:id
//   delete(@Param('id') id: string) {
//     // Find the index of the user and remove them
//     const userIndex = this.users.findIndex((user) => user.id === id);
//     if (userIndex === -1) {
//       return { message: 'User not found' };
//     }
//     const deletedUser = this.users.splice(userIndex, 1); // Remove user from array
//     return { message: 'User deleted successfully', deletedUser: deletedUser[0] };
//   }
// }



// @Controller('users')
// export class UsersController {
//   private ids: string[] = []; // Class-level array to store IDs

//   @Get(':id') // GET /users/:id
//   findOne(@Param('id') id: string) {
//     this.ids.push(id); // Add the ID to the array
//     return this.ids; // Return the array of IDs
//   }
// }

import { Controller, Get, Param, Post, Body, Patch, Delete, Query } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  role?: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = []; // In-memory array to store user data
  private nextId = 1; // Tracks the next ID to assign

  @Get() // GET /users or /users?name=value
  findAll(@Query('name') name?: string) {
    if (name) {
      // Return users matching the query parameter 'name'
      return this.users.filter((user) => user.name === name);
    }
    return this.users; // Return all users if no query is provided
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    // Find and return the user with the specified ID
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return { message: 'User not found' };
    }
    return user;
  }

  @Post() // POST /users
  create(@Body() user: Omit<User, 'id'>) {
    // Check if the ID is provided and remove it if it exists
    if ('id' in user) {
      delete user.id; // Remove 'id' from the request body if present
    }

    // Automatically assign ID for the first user and increment for subsequent users
    const newUser: User = {
      id: this.nextId.toString(),
      ...user, // Spread the rest of the user properties (name, role)
    };
    this.users.push(newUser);
    this.nextId++; // Increment the ID for the next user
    return newUser;
  }


  //auto id but not for patch
//   @Patch(':id') // PATCH /users/:id
//   update(@Param('id') id: string, @Body() userUpdate: Partial<User>) {
//     // Find the user and update their details
//     const userIndex = this.users.findIndex((user) => user.id === id);
//     if (userIndex === -1) {
//       return { message: 'User not found' };
//     }
//     this.users[userIndex] = { ...this.users[userIndex], ...userUpdate };
//     return this.users[userIndex];
//   }

//   @Delete(':id') // DELETE /users/:id
//   delete(@Param('id') id: string) {
//     // Find the index of the user and remove them
//     const userIndex = this.users.findIndex((user) => user.id === id);
//     if (userIndex === -1) {
//       return { message: 'User not found' };
//     }
//     const deletedUser = this.users.splice(userIndex, 1); // Remove user from array
//     return { message: 'User deleted successfully', deletedUser: deletedUser[0] };
//   }
// }

@Patch(':id') // PATCH /users/:id
update(@Param('id') id: string, @Body() userUpdate: Partial<User>) {
  // Find the user by ID
  const userIndex = this.users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return { message: 'User not found' };
  }

  // Ensure the 'id' is not part of the update payload
  const { id: _, ...updateData } = userUpdate; // Remove the 'id' from the update data

  // Update the user with the new data (excluding 'id')
  this.users[userIndex] = { ...this.users[userIndex], ...updateData };
  return this.users[userIndex];
}


  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    // Find the index of the user and remove them
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return { message: 'User not found' };
    }
    const deletedUser = this.users.splice(userIndex, 1); // Remove user from array
    return { message: 'User deleted successfully', deletedUser: deletedUser[0] };
  }
}
