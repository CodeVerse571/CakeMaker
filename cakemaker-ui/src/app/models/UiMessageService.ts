import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class UiMessageService {
  constructor(private readonly messageService: MessageService) {}

  success(detail: string, summary = 'Éxito'): void {
    this.messageService.add({
      severity: 'success',
      summary,
      detail,
      life: 3000,
    });
  }

  error(detail: string, summary = 'Error'): void {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      life: 4000,
    });
  }

  warn(detail: string, summary = 'Advertencia'): void {
    this.messageService.add({
      severity: 'warn',
      summary,
      detail,
      life: 3000,
    });
  }

  info(detail: string, summary = 'Información'): void {
    this.messageService.add({
      severity: 'info',
      summary,
      detail,
      life: 3000,
    });
  }
}
