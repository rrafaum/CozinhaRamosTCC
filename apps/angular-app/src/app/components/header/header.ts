import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  @Input() quantidadeCarrinho = 0;
  @Input() usuarioNome?: string;
  @Output() carrinhoAberto = new EventEmitter<void>();
  @Output() sair = new EventEmitter<void>();
}
