import { Injectable } from '@angular/core';
import { User } from '../shared/interfaces/user'; // Asegúrate de que la ruta a tu interfaz User sea correcta

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { };

  GetUser(): User {

    return {
      name: 'Jose',
      email: 'jose@example.com',
      password: '123456',
      image: 'https://joseverutti.netlify.app/profile.jpeg',
    };
  }
}