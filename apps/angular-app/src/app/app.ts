import { Component, OnInit, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { ProdutoService } from './services/produto.service';
import { ToastService } from './services/toast.service';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
import { CardProdutoComponent } from './components/card-produto/card-produto';
import { CarrinhoModalComponent } from './components/carrinho-modal/carrinho-modal';
import { LoginComponent } from './pages/login/login';
import { ItemCarrinho, Produto, UsuarioLogado } from './models/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    CardProdutoComponent,
    CarrinhoModalComponent,
    LoginComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private authService = inject(AuthService);
  private produtoService = inject(ProdutoService);
  toastService = inject(ToastService);

  usuario = computed(() => this.authService.usuario());
  produtos = signal<Produto[]>([]);
  carrinho = signal<ItemCarrinho[]>(this.carregarCarrinho());
  isCarrinhoAberto = signal(false);
  isCarregando = signal(true);
  categoriaAtiva = signal('Todos');

  categorias = computed(() => ['Todos', ...new Set(this.produtos().map(p => p.categoria))]);
  totalItens = computed(() => this.carrinho().reduce((acc, i) => acc + i.quantidade, 0));
  produtosFiltrados = computed(() =>
    this.categoriaAtiva() === 'Todos'
      ? this.produtos()
      : this.produtos().filter(p => p.categoria === this.categoriaAtiva())
  );
  skeletons = Array.from({ length: 6 });

  ngOnInit() {
    if (this.usuario()) this.buscarProdutos();
  }

  private carregarCarrinho(): ItemCarrinho[] {
    try {
      const salvo = localStorage.getItem('@CozinhaRamos:carrinho');
      return salvo ? JSON.parse(salvo) : [];
    } catch { return []; }
  }

  private salvarCarrinho() {
    localStorage.setItem('@CozinhaRamos:carrinho', JSON.stringify(this.carrinho()));
  }

  buscarProdutos() {
    this.isCarregando.set(true);
    this.produtoService.getProdutos().subscribe({
      next: (data) => { this.produtos.set(data); this.isCarregando.set(false); },
      error: () => { this.toastService.error('Não foi possível carregar o cardápio.'); this.isCarregando.set(false); }
    });
  }

  handleLoginSuccess(userData: UsuarioLogado) {
    this.authService.salvarUsuario(userData);
    this.toastService.success(`Bem-vindo, ${userData.nome}!`);
    this.buscarProdutos();
  }

  handleSair() {
    this.authService.sair();
    this.toastService.success('Sessão encerrada!');
  }

  adicionarAoCarrinho(produto: Produto) {
    this.carrinho.update(prev => {
      const existe = prev.find(i => i.id === produto.id);
      return existe
        ? prev.map(i => i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i)
        : [...prev, { ...produto, quantidade: 1 }];
    });
    this.salvarCarrinho();
    this.toastService.success(`${produto.nome} adicionado!`);
  }

  removerDoCarrinho(id: string) {
    this.carrinho.update(prev => prev.filter(i => i.id !== id));
    this.salvarCarrinho();
  }

  atualizarQuantidade(event: { id: string; delta: number }) {
    this.carrinho.update(prev =>
      prev.map(i => i.id === event.id ? { ...i, quantidade: i.quantidade + event.delta } : i)
          .filter(i => i.quantidade > 0)
    );
    this.salvarCarrinho();
  }

  limparCarrinho() {
    this.carrinho.set([]);
    this.isCarrinhoAberto.set(false);
    this.salvarCarrinho();
  }
}
