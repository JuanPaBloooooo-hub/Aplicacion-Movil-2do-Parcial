
import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  IonContent,
  IonText,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline, cardOutline } from 'ionicons/icons';

import { AlertServicesController} from '../../services/alert';
import { Carrito } from '../../services/carrito';
import { HeaderPage } from '../header/header.page';




@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
  imports: [
    HeaderPage,
    IonContent,
    IonText,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    CurrencyPipe
  ]
})
export class PagosPage {

  public carritoService = inject(Carrito);
  private alerta = inject(AlertServicesController);

  constructor() {
    addIcons({
      trashOutline,
      cardOutline
    });
  }

  // Calculamos el IVA
  get iva(): number {
    return this.carritoService.subtotal() * 0.16;
  }

  // Calculamos el total
  get total(): number {
    return this.carritoService.subtotal() + this.iva;
  }

  // Eliminar paquete del carrito
  async eliminarPaquete(id: number): Promise<void> {

    await this.carritoService.eliminarPaquete(id);

    await this.alerta.mostrarAlerta(
      'Paquete eliminado',
      'El paquete se eliminó del carrito.'
    );
  }
}
