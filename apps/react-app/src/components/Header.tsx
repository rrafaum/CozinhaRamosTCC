import { ShoppingCart } from 'lucide-react';
import logoImg from '../assets/logo-cozinha-ramos.png'; 

interface HeaderProps {
  quantidadeCarrinho: number;
  onCarrinhoAberto: ()=> void;
}

export default function Header({ quantidadeCarrinho, onCarrinhoAberto }: HeaderProps) {
  return (
    <header className="bg-ramos-verde text-ramos-bege p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-ramos-bege p-1 rounded-lg">
            <img 
              src={logoImg} 
              alt="Logo Cozinha Ramos" 
              className="w-10 h-10 object-contain" 
            />
          </div>
          
          <div>
            <h1 className="text-xl font-bold leading-none">Cozinha Ramos</h1>
            <span className="text-[10px] uppercase tracking-widest opacity-80">
              Naturalmente saborosa!
            </span>
          </div>
        </div>
        
        <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors" onClick={onCarrinhoAberto}>
          <ShoppingCart size={26} />
          {quantidadeCarrinho > 0 && (
            <span className="absolute -top-1 -right-1 bg-ramos-marrom text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-ramos-verde">
              {quantidadeCarrinho}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}