// src/app/features/home/home/home.component.ts
import { Component, PLATFORM_ID, Inject, ChangeDetectorRef, AfterViewInit } from '@angular/core'; // Importa ChangeDetectorRef y AfterViewInit
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GeolocationService } from '../../services/geolocation.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { PhoneComponent } from '../../shared/components/phone/phone.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LoadingComponent, PhoneComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit { // Implementa AfterViewInit
  isLoading: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private geolocationService: GeolocationService,
    private cdr: ChangeDetectorRef // Inyecta ChangeDetectorRef
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
          // Este error sería si initMapWithLocation mismo falla catastróficamente o re-lanza un error.
          // El error "Map container not found" ya se maneja dentro de initMapWithLocation.
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
      console.log('Ubicación obtenida:', location); // Bueno para depurar

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

    } catch (error) {
      // Aquí es donde se loguea "Error: Error: Map container not found." si el HTML no está corregido.
      // O "Error: Datos de ubicación inválidos..." si la geolocalización falla.
      console.error('Error capturado en initMapWithLocation:', error);
      // Considera 'await' si showDefaultMap también hace operaciones asíncronas importantes
      // que deban completarse antes de que isLoading se ponga en false.
      await this.showDefaultMap(); 
    }
  }

  private async showDefaultMap() {
    try {
      const L = await import('leaflet');
      const defaultLat = 40.416775;
      const defaultLng = -3.703790;

      // También se beneficia de que 'mapContainer' siempre exista
      const map = new L.Map('mapContainer').setView([defaultLat, defaultLng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        // ... attribution
      }).addTo(map);
      console.log('Mostrando mapa por defecto.');
    } catch (error) {
      console.error('Error al cargar el mapa predeterminado:', error);
    }
  }
}