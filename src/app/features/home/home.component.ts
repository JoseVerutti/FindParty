// src/app/features/home/home/home.component.ts
import { Component, PLATFORM_ID, Inject, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GeolocationService } from '../../services/geolocation.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { PhoneComponent } from '../../shared/components/phone/phone.component';
import { PartyService } from '../../services/party.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LoadingComponent, PhoneComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  isLoading: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private geolocationService: GeolocationService,
    private cdr: ChangeDetectorRef,
    private partyService: PartyService
  ) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Usar setTimeout para diferir las actualizaciones y evitar ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(async () => {
        this.isLoading = true;
        this.cdr.detectChanges(); // Notificar a Angular del cambio de isLoading

        try {
          await this.initMapWithLocation();
        } catch (error) {
          console.error('Error en ngAfterViewInit durante la secuencia de inicialización del mapa:', error);
        } finally {
          this.isLoading = false;
          this.cdr.detectChanges(); // Notificar a Angular del cambio de isLoading
        }
      }, 0); // El timeout de 0ms es suficiente para diferirlo al siguiente ciclo de eventos.
    }
  }

  private async initMapWithLocation() {
    try {
      const location = await this.geolocationService.getCurrentLocation();
      console.log('Ubicación obtenida:', location);

      if (!location || typeof location.latitude === 'undefined' || typeof location.longitude === 'undefined') {
        throw new Error('Datos de ubicación inválidos o no obtenidos.');
      }

      const L = await import('leaflet');
      
      // Ahora 'mapContainer' debería estar siempre presente gracias al cambio en el HTML
      const map = new L.Map('mapContainer').setView(
        [location.latitude, location.longitude],
        13
      );

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
      }).addTo(map);

      L.marker([location.latitude, location.longitude])
        .addTo(map)
        .bindPopup('Tu ubicación actual')
        .openPopup();
      
      // Ahora llamamos a la función para cargar las fiestas y pasamos L y map como parámetros
      this.loadAndDisplayParties(L, map);

    } catch (error) {
      console.error('Error capturado en initMapWithLocation:', error);
      await this.showDefaultMap(); 
    }
  }

  
  private loadAndDisplayParties(L: any, map: any) {
    if (!map) {
      console.error('Mapa no inicializado. No se pueden cargar las fiestas.');
      return;
    }

    const parties = this.partyService.GetPartys(); // Llama al servicio para obtener las fiestas

    parties.forEach(party => {
      // Asegúrate de que la fiesta tiene datos de ubicación válidos
      if (party.location && typeof party.location.latitude === 'number' && typeof party.location.longitude === 'number') {
        L.marker([party.location.latitude, party.location.longitude])
          .addTo(map) // Ahora usamos el objeto map pasado como parámetro
          .bindPopup(`<b>${party.name}</b><br>${party.description}<br>${party.address}`);
      } else {
        console.warn(`Fiesta con ID ${party.id} no tiene coordenadas válidas.`);
      }
    });
  }

  private async showDefaultMap() {
    try {
      const L = await import('leaflet');
      const defaultLat = 40.416775;
      const defaultLng = -3.703790;

      const map = new L.Map('mapContainer').setView([defaultLat, defaultLng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
      }).addTo(map);

      console.log('Mostrando mapa por defecto.');
      
      // También mostramos las fiestas en el mapa por defecto
      this.loadAndDisplayParties(L, map);
      
    } catch (error) {
      console.error('Error al cargar el mapa predeterminado:', error);
    }
  }
}