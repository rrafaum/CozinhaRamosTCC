import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemCarrinho } from '../models/types';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  constructor(private http: HttpClient) {}

  criarPedido(usuarioId: string, itens: ItemCarrinho[], total: number) {
    const payload = {
      usuarioId,
      itens: itens.map(i => ({ produtoId: i.id, nome: i.nome, quantidade: i.quantidade, preco: i.preco })),
      total
    };
    return this.http.post(`${environment.apiUrl}/pedidos`, payload);
  }
}
