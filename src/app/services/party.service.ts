import { Injectable } from '@angular/core';
import { Party } from '../shared/interfaces/party'; // Asegúrate de que la ruta a tu interfaz Party sea correcta
// Ya no es necesario importar randomUUID si no se usa
// import { randomUUID } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor() { };

  GetPartys(): Party[] {

    // Define un UUID fijo para usar en todas las propiedades
    const fixedUUID = '00000000-0000-0000-0000-000000000001'; // Puedes cambiar este UUID por otro fijo si lo deseas

    // Coordenadas aproximadas de diferentes zonas en Cali, Colombia
    const caliCoordinates = [
      { latitude: 3.4516, longitude: -76.5320, name: 'Centro de Cali' }, // Cerca del centro/San Antonio
      { latitude: 3.4850, longitude: -76.5320, name: 'Zona Norte (Chipichape)' }, // Zona Norte
      { latitude: 3.3800, longitude: -76.5380, name: 'Zona Sur (Ciudad Jardín)' }, // Zona Sur
      { latitude: 3.4200, longitude: -76.5100, name: 'Oriente de Cali' }, // Zona Oriente
    ];

    const parties: Party[] = [
      {
        // Usamos el UUID fijo
        id: fixedUUID,
        name: 'Rumba en San Antonio',
        description: 'Una fiesta cultural en el histórico barrio de San Antonio.',
        address: 'Calle 5 con Carrera 1 Oeste', // Dirección de ejemplo
        city: 'Cali',
        location: {
          latitude: caliCoordinates[0].latitude + (Math.random() - 0.5) * 0.01, // Añadir pequeña variación
          longitude: caliCoordinates[0].longitude + (Math.random() - 0.5) * 0.01
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        // Usamos el UUID fijo
        createdBy: fixedUUID,
        updatedBy: fixedUUID,
      },
      {
        // Usamos el UUID fijo
        id: fixedUUID,
        name: 'Noche Electrónica en el Norte',
        description: 'Los mejores DJs de la ciudad en un club del norte.',
        address: 'Avenida 6 Norte # 35-10', // Dirección de ejemplo
        city: 'Cali',
        location: {
          latitude: caliCoordinates[1].latitude + (Math.random() - 0.5) * 0.01,
          longitude: caliCoordinates[1].longitude + (Math.random() - 0.5) * 0.01
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        // Usamos el UUID fijo
        createdBy: fixedUUID,
        updatedBy: fixedUUID,
      },
      {
        // Usamos el UUID fijo
        id: fixedUUID,
        name: 'Sunset Party en el Sur',
        description: 'Disfruta de un atardecer espectacular con buena música en el sur.',
        address: 'Carrera 100 # 15A-20', // Dirección de ejemplo
        city: 'Cali',
        location: {
          latitude: caliCoordinates[2].latitude + (Math.random() - 0.5) * 0.01,
          longitude: caliCoordinates[2].longitude + (Math.random() - 0.5) * 0.01
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        // Usamos el UUID fijo
        createdBy: fixedUUID,
        updatedBy: fixedUUID,
      },
    	{
        // Usamos el UUID fijo
        id: fixedUUID,
        name: 'Festival Urbano en el Oriente',
        description: 'Un evento vibrante celebrando la cultura urbana del oriente de Cali.',
        address: 'Calle 70 con Carrera 8', // Dirección de ejemplo
        city: 'Cali',
        location: {
          latitude: caliCoordinates[3].latitude + (Math.random() - 0.5) * 0.01,
          longitude: caliCoordinates[3].longitude + (Math.random() - 0.5) * 0.01
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        // Usamos el UUID fijo
        createdBy: fixedUUID,
        updatedBy: fixedUUID,
      }
    ];

    return parties;
  }
}