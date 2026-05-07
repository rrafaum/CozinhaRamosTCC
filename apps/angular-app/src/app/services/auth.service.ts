import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogado } from '../models/types';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  usuario = signal<UsuarioLogado | null>(this.carregarUsuario());

  constructor(private http: HttpClient) {}

  private carregarUsuario(): UsuarioLogado | null {
    const salvo = localStorage.getItem('@CozinhaRamos:usuario');
    return salvo ? JSON.parse(salvo) : null;
  }

  login(email: string, senha: string) {
    return this.http.post<UsuarioLogado>(`${environment.apiUrl}/auth/login`, { email, senha });
  }

  register(nome: string, email: string, senha: string) {
    return this.http.post<UsuarioLogado>(`${environment.apiUrl}/auth/register`, { nome, email, senha });
  }

  salvarUsuario(userData: UsuarioLogado) {
    this.usuario.set(userData);
    localStorage.setItem('@CozinhaRamos:usuario', JSON.stringify(userData));
  }

  sair() {
    this.usuario.set(null);
    localStorage.removeItem('@CozinhaRamos:usuario');
  }
}
