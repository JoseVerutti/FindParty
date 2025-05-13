import { Component, input } from '@angular/core';

@Component({
  selector: 'app-phone',
  imports: [],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css'
})
export class PhoneComponent {

  phoneContent = input<string>();
  
}
