import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCarrinho, UsuarioLogado } from '../../models/types';
import { PedidoService } from '../../services/pedido.service';
import { ToastService } from '../../services/toast.service';

const WHATSAPP_NUMBER = '559999999999';
const APP_NAME = 'Cozinha Ramos';

@Component({
  selector: 'app-carrinho-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho-modal.html',
  styleUrl: './carrinho-modal.css'
})
export class CarrinhoModalComponent {
  @Input() itens: ItemCarrinho[] = [];
  @Input() usuario: UsuarioLogado | null = null;
  @Output() fechar = new EventEmitter<void>();
  @Output() remover = new EventEmitter<string>();
  @Output() atualizarQtd = new EventEmitter<{ id: string; delta: number }>();
  @Output() finalizar = new EventEmitter<void>();

  private moneyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  constructor(private pedidoService: PedidoService, private toast: ToastService) {}

  get total(): number {
    return this.itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  }

  formatarPreco(valor: number): string {
    return this.moneyFormatter.format(valor);
  }

  handleAtualizarQtd(item: ItemCarrinho, delta: number) {
    if (item.quantidade + delta <= 0) {
      this.remover.emit(item.id);
    } else {
      this.atualizarQtd.emit({ id: item.id, delta });
    }
  }

  async finalizarPedido() {
    if (!this.usuario) {
      alert('Você precisa estar logado para finalizar o pedido.');
      return;
    }

    this.pedidoService.criarPedido(this.usuario.id, this.itens, this.total).subscribe({
      next: () => {
        let mensagem = `*Novo Pedido - ${APP_NAME}*\nCliente: ${this.usuario!.nome}\n\n`;
        this.itens.forEach(item => {
          mensagem += `${item.quantidade}x ${item.nome} - ${this.moneyFormatter.format(item.preco * item.quantidade)}\n`;
        });
        mensagem += `\n*Total: ${this.moneyFormatter.format(this.total)}*`;

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        this.finalizar.emit();
      },
      error: () => {
        alert('Houve um erro ao registrar seu pedido no sistema. Mas você ainda pode tentar pelo WhatsApp.');
      }
    });
  }
}
