// src/app/core/services/geolocation.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationCoordinates } from '../shared/interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  /**
   * Obtiene la ubicación actual del dispositivo
   * @returns Promise con las coordenadas de ubicación
   */
  getCurrentLocation(): Promise<LocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalización no soportada por este navegador'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          let errorMessage = 'Error al obtener la ubicación';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Usuario denegó la solicitud de geolocalización';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'La información de ubicación no está disponible';
              break;
            case error.TIMEOUT:
              errorMessage = 'La solicitud para obtener la ubicación expiró';
              break;
          }
          
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }
}