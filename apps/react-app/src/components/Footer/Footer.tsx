import './Footer.css';
import { Icons } from '../Icons';

export default function Footer() {
  const anoAtual = new Date().getFullYear();

  const handleLinkVazio = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-grid">
          
          <div>
            <h4 className="footer-title">Sobre o Projeto</h4>
            <p className="footer-text">
              Análise Comparativa de Desempenho de Carregamento Inicial e Tamanho de Bundle 
              em SPA feito em React e Angular.
            </p>
            <p className="footer-tag">
              Trabalho de Conclusão de Curso
            </p>
          </div>

          <div className="footer-brand-section">
            <h4 className="footer-title">Cozinha Ramos</h4>
            <p className="footer-slogan">"Tradição e sabor que chegam até você."</p>
            
            <div className="social-links">
              <a href="#" onClick={handleLinkVazio} aria-label="Instagram" className="social-icon">
                <Icons.Instagram size={20} />
              </a>
              <a href="#" onClick={handleLinkVazio} aria-label="Facebook" className="social-icon">
                <Icons.Facebook size={20} />
              </a>
              <a href="#" onClick={handleLinkVazio} aria-label="WhatsApp" className="social-icon">
                <Icons.WhatsApp size={20} />
              </a>
            </div>

            <div className="footer-contact">
              <span>Rua dos Pratos, 1516 - Talheres</span>
              <span>contato@cozinharamos.com.br</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {anoAtual} Cozinha Ramos - Fins acadêmicos.</p>
          <div className="tech-stack">
            <span className="tech-badge">React v18+</span>
            <span className="tech-badge">Tailwind CSS</span>
            <span className="tech-badge">Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}