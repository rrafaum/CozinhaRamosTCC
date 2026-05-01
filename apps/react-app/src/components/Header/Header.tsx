import { ShoppingCart } from 'lucide-react';
import logoImg from '../../assets/logo-cozinha-ramos.png'; 
import './Header.css';

interface HeaderProps {
  quantidadeCarrinho: number;
  onCarrinhoAberto: () => void;
}

export default function Header({ quantidadeCarrinho, onCarrinhoAberto }: HeaderProps) {
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
        
        <button className="btn-cart" onClick={onCarrinhoAberto}>
          <ShoppingCart size={26} />
          {quantidadeCarrinho > 0 && (
            <span className="cart-counter">
              {quantidadeCarrinho}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}