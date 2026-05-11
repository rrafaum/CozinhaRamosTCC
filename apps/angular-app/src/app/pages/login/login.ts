import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UsuarioLogado } from '../../models/types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<UsuarioLogado>();

  isLogin = true;
  loading = false;
  error = '';
  nome = '';
  email = '';
  senha = '';

  constructor(private authService: AuthService) {}

  handleEnviar(e: Event) {
    e.preventDefault();
    this.loading = true;
    this.error = '';

    const obs = this.isLogin
      ? this.authService.login(this.email, this.senha)
      : this.authService.register(this.nome, this.email, this.senha);

    obs.subscribe({
      next: (data) => {
        this.loading = false;
        this.loginSuccess.emit(data);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Erro ao processar. Tente novamente.';
      }
    });
  }
}
