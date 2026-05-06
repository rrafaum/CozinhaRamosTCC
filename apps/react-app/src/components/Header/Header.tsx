import logoImg from '../../assets/logo-cozinha-ramos.png'; 
import { Icons } from '../Icons';
import './Header.css';

interface HeaderProps {
  quantidadeCarrinho: number;
  onCarrinhoAberto: () => void;
  onSair: () => void;
  usuarioNome?: string;
}

export default function Header({ 
  quantidadeCarrinho, 
  onCarrinhoAberto, 
  onSair, 
  usuarioNome 
}: HeaderProps) {
  return (
    <header className="header-wrapper">
      <div className="header-container">
        
        <div className="header-brand">
          <div className="logo-wrapper">
            <img 
              src={logoImg} 
              alt="Logo Cozinha Ramos" 
              className="logo-img" 
            />
          </div>
          
          <div className="brand-text-container">
            <h1 className="brand-title">Cozinha Ramos</h1>
            <span className="brand-slogan">
              Naturalmente saborosa!
            </span>
          </div>
        </div>
        
        <div className="header-actions">
          {usuarioNome && (
            <div className="user-section">
              <span className="user-name">
                Olá, <strong>{usuarioNome}</strong>
              </span>
              <button 
                className="btn-logout" 
                onClick={onSair}
                title="Sair da conta"
              >
                <Icons.Logout size={18} />
              </button>
            </div>
          )}

          <button 
            className="btn-cart" 
            onClick={onCarrinhoAberto}
            aria-label="Abrir carrinho de compras"
          >
            <Icons.Cart size={26} />
            {quantidadeCarrinho > 0 && (
              <span className="cart-counter">
                {quantidadeCarrinho}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}