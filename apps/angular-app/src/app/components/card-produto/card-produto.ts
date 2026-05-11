import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/types';

@Component({
  selector: 'app-card-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-produto.html',
  styleUrl: './card-produto.css'
})
export class CardProdutoComponent {
  @Input() produto!: Produto;
  @Output() add = new EventEmitter<Produto>();

  get precoFormatado(): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.produto.preco);
  }
}
