import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, Sparkles, Zap, Download, Menu, X, Check, 
  Brain, Rocket, Globe, Mail, Phone, Instagram, Star, 
  ChevronRight, Lock, Layout, Type, Image as ImageIcon,
  Heart 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateEbookContent, suggestCoverIdeas, checkApiKey } from './services/geminiService';
import { BlogPost, FaqItem, PricingPlan, GeneratorState, GeneratedEbook } from './types';

// --- Constants ---
const CONTACT_INFO = {
  whatsapp: "+258 857658841",
  email: "humoristamilvan3@gmail.com",
  instagram: "@humoriata Milvan"
};

// --- Components ---

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre', path: '/about' },
    { name: 'Criar eBook', path: '/create' },
    { name: 'Planos', path: '/pricing' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contato', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
            <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-lg text-white group-hover:scale-110 transition-transform">
              <BookOpen size={24} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700">
              Milvan eBook
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  location.pathname === link.path ? 'text-blue-600 font-semibold' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
             <Link to="/create">
                <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-all hover:shadow-lg flex items-center gap-2">
                  <Sparkles size={16} />
                  Começar Agora
                </button>
             </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-blue-600 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMenu}
                className={`block px-3 py-4 rounded-md text-base font-medium ${
                   location.pathname === link.path ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/create" onClick={closeMenu} className="block w-full mt-4">
                <button className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg text-base font-medium flex justify-center items-center gap-2">
                  <Sparkles size={18} />
                  Criar eBook Agora
                </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <BookOpen size={24} className="text-blue-500" />
              <span className="text-xl font-bold">Milvan eBook Creator</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              A plataforma líder em Moçambique para criação de eBooks com Inteligência Artificial. 
              Transforme ideias em produtos digitais em minutos.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Plataforma</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/create" className="hover:text-blue-400 transition">Criar eBook</Link></li>
              <li><Link to="/pricing" className="hover:text-blue-400 transition">Planos e Preços</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition">Sobre Nós</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="hover:text-blue-400 transition">Central de Ajuda</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition">Fale Conosco</Link></li>
              <li><Link to="/blog" className="hover:text-blue-400 transition">Dicas de Vendas</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Phone size={16} className="text-blue-500"/> {CONTACT_INFO.whatsapp}</li>
              <li className="flex items-center gap-2"><Mail size={16} className="text-blue-500"/> {CONTACT_INFO.email}</li>
              <li className="flex items-center gap-2"><Instagram size={16} className="text-blue-500"/> {CONTACT_INFO.instagram}</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Milvan eBook Creator. Todos os direitos reservados.
          </p>
          
          <div className="flex items-center gap-1.5 group select-none">
            <span>Desenvolvido com</span>
            <Heart 
              size={14} 
              className="text-red-500 fill-red-500 animate-heartbeat" 
              aria-label="coração pulsando" 
            />
            <span>por</span>
            <a 
              href="https://www.supremasites.top/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-white transition-colors font-medium hover:underline decoration-slate-600 underline-offset-4"
            >
              Suprema Sites Express
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const Home: React.FC = () => {
  useEffect(() => {
    document.title = "Milvan eBook Creator | Crie eBooks com IA em Segundos";
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 bg-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-white"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Disponível 24h em todo Moçambique
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Crie eBooks Profissionais <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              em Segundos com IA
            </span>
          </h1>
          
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            A plataforma revolucionária para empreendedores e criadores de conteúdo. 
            Digite um tema, e nossa Inteligência Artificial escreve, formata e cria a capa do seu eBook.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 hover:scale-105 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Criar eBook Grátis
            </Link>
            <Link to="/about" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              Como Funciona
            </Link>
          </div>

          {/* Mockup Preview */}
          <div className="mt-20 relative mx-auto max-w-5xl">
            <div className="bg-slate-900 rounded-2xl p-2 shadow-2xl border border-slate-800">
               <div className="bg-slate-800 rounded-xl overflow-hidden aspect-video relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black opacity-90"></div>
                  <div className="relative z-10 text-center space-y-4 p-8">
                     <div className="flex justify-center space-x-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                     </div>
                     <p className="text-green-400 font-mono text-lg">AI Status: Generative Processing...</p>
                     <p className="text-white text-3xl font-bold font-mono">"Como Investir na Bolsa"</p>
                     <div className="h-2 w-64 mx-auto bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-2/3 animate-pulse"></div>
                     </div>
                     <p className="text-slate-400 text-sm">Gerando Capítulo 3 de 5...</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Como funciona?</h2>
            <p className="mt-4 text-lg text-slate-600">Três passos simples para ter seu produto digital pronto.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Brain size={40} />, title: "1. Escolha o Tema", desc: "Digite uma ideia ou palavra-chave. Nossa IA analisa as tendências de mercado." },
              { icon: <Rocket size={40} />, title: "2. A IA Trabalha", desc: "Em segundos, geramos o sumário, capítulos completos e sugestões de capa." },
              { icon: <Download size={40} />, title: "3. Baixe e Venda", desc: "Exporte em PDF pronto para vender na Hotmart, Monetizze ou redes sociais." }
            ].map((step, idx) => (
              <div key={idx} className="relative p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="absolute -top-6 left-8 bg-white p-4 rounded-xl shadow-md text-blue-600 border border-blue-50">
                  {step.icon}
                </div>
                <h3 className="mt-8 text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">O que dizem nossos criadores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Carlos M.", role: "Empreendedor Digital", text: "Criei 3 eBooks em uma tarde e já comecei a vender. A velocidade é impressionante!" },
              { name: "Ana P.", role: "Afiliada", text: "A qualidade do texto me surpreendeu. Não parece robô, parece um escritor experiente." },
              { name: "João D.", role: "Estudante", text: "Uso para criar resumos e materiais de estudo. A ferramenta é muito intuitiva." }
            ].map((t, i) => (
              <div key={i} className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <div className="flex gap-1 mb-4 text-yellow-400"><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/></div>
                <p className="text-slate-300 italic mb-6">"{t.text}"</p>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Pronto para criar seu best-seller?</h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">Junte-se a centenas de moçambicanos que estão faturando com produtos digitais.</p>
        <Link to="/create" className="inline-block bg-white text-blue-700 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-transform">
          Começar Gratuitamente
        </Link>
      </section>
    </div>
  );
};

const About: React.FC = () => {
  useEffect(() => { document.title = "Sobre Nós | Milvan eBook Creator"; }, []);
  return (
    <div className="pt-12 pb-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Nossa Missão</h1>
          <p className="text-xl text-slate-600">Democratizar a criação de conteúdo digital em Moçambique.</p>
        </div>
        
        <div className="prose prose-lg prose-slate mx-auto">
          <p>
            O <strong>Milvan eBook Creator</strong> nasceu com um objetivo claro: permitir que qualquer pessoa, independente de sua habilidade de escrita, possa transformar conhecimento em um produto digital rentável.
          </p>
          <p>
            Localizados em Moçambique e operando 24 horas por dia online, entendemos os desafios dos empreendedores locais. Falta de tempo e bloqueio criativo não devem ser barreiras para o seu sucesso.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-800 text-xl mb-2">Visão</h3>
              <p className="text-blue-700">Ser a principal ferramenta de IA para criadores de conteúdo na África Lusófona até 2026.</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
              <h3 className="font-bold text-purple-800 text-xl mb-2">Valores</h3>
              <p className="text-purple-700">Inovação, Acessibilidade, Velocidade e Qualidade Profissional.</p>
            </div>
          </div>

          <h3>Por que somos diferentes?</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Foco Local:</strong> Entendemos o contexto e as necessidades do mercado moçambicano.</li>
            <li><strong>Simplicidade Radical:</strong> Não precisa ser expert em tecnologia. Se você sabe enviar uma mensagem, sabe criar um eBook.</li>
            <li><strong>Tecnologia de Ponta:</strong> Utilizamos os modelos de linguagem mais avançados (Gemini) para garantir textos coerentes e humanos.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const CreateEbook: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Profissional e Educativo');
  const [state, setState] = useState<GeneratorState>(GeneratorState.IDLE);
  const [generatedData, setGeneratedData] = useState<GeneratedEbook | null>(null);
  const [error, setError] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => { document.title = "Criar eBook | Milvan eBook Creator"; }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!checkApiKey()) {
      setError("Chave de API não configurada. Por favor configure a API_KEY.");
      return;
    }
    if (!topic) return;

    setError('');
    setState(GeneratorState.GENERATING_OUTLINE);
    
    try {
      // Simulate steps for UX
      setTimeout(() => setState(GeneratorState.GENERATING_CONTENT), 2000);
      
      const content = await generateEbookContent(topic, tone);
      const coverIdeas = await suggestCoverIdeas(topic);
      
      setGeneratedData({
        title: topic,
        content: content,
        coverStyle: coverIdeas[0] || "Moderno"
      });
      setState(GeneratorState.COMPLETED);
      
      // Scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err) {
      console.error(err);
      setState(GeneratorState.ERROR);
      setError("Ocorreu um erro ao gerar o eBook. Tente novamente com um tema diferente ou verifique sua conexão.");
    }
  };

  const handleDownload = () => {
    if (!generatedData) return;
    const blob = new Blob([generatedData.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedData.title.replace(/\s+/g, '_')}_MilvanEbook.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("Download iniciado! Converta o Markdown para PDF usando seu editor preferido ou adquira o Plano Premium para PDF direto.");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <Sparkles className="text-purple-600" />
            Estúdio de Criação IA
          </h1>
          <p className="mt-2 text-slate-600">Descreva sua ideia e deixe a mágica acontecer.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
              <form onSubmit={handleGenerate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tema do eBook</label>
                  <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Ex: Marketing Digital para Iniciantes"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    required
                    disabled={state === GeneratorState.GENERATING_CONTENT || state === GeneratorState.GENERATING_OUTLINE}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tom de Voz</label>
                  <select 
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option>Profissional e Educativo</option>
                    <option>Inspirador e Motivacional</option>
                    <option>Descontraído e Jovem</option>
                    <option>Técnico e Acadêmico</option>
                    <option>Persuasivo (Vendas)</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={state === GeneratorState.GENERATING_CONTENT || state === GeneratorState.GENERATING_OUTLINE || !topic}
                  className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                    state === GeneratorState.IDLE || state === GeneratorState.COMPLETED || state === GeneratorState.ERROR
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-200' 
                    : 'bg-slate-400 cursor-not-allowed'
                  }`}
                >
                  {state === GeneratorState.IDLE || state === GeneratorState.COMPLETED || state === GeneratorState.ERROR ? (
                    <>
                      <Zap size={20} />
                      Gerar eBook com IA
                    </>
                  ) : (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processando...
                    </>
                  )}
                </button>
                
                {state !== GeneratorState.IDLE && state !== GeneratorState.ERROR && state !== GeneratorState.COMPLETED && (
                  <div className="text-center text-sm text-slate-500 animate-pulse">
                    {state === GeneratorState.GENERATING_OUTLINE && "Analisando nicho e criando estrutura..."}
                    {state === GeneratorState.GENERATING_CONTENT && "Escrevendo capítulos e formatando..."}
                  </div>
                )}
                
                {error && (
                   <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                     {error}
                   </div>
                )}
              </form>
            </div>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2" ref={resultRef}>
            {generatedData ? (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden min-h-[600px] flex flex-col">
                {/* Toolbar */}
                <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Check size={16} className="text-green-500" />
                    Gerado com sucesso
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800 transition">
                      <Download size={16} />
                      Baixar (MD)
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 transition" onClick={() => alert("Feature Premium: Editor Visual Avançado disponível no plano pago.")}>
                      <Layout size={16} />
                      Editar Capa
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 prose prose-slate max-w-none flex-grow">
                   <div className="mb-8 p-6 bg-gradient-to-br from-blue-900 to-purple-900 text-white rounded-xl shadow-inner text-center">
                      <p className="text-xs uppercase tracking-widest opacity-70 mb-2">Sugestão de Capa</p>
                      <h1 className="text-3xl font-bold text-white m-0 leading-tight">{generatedData.title}</h1>
                      <div className="mt-4 text-sm opacity-80 border-t border-white/20 pt-4 inline-block">
                        Estilo Visual Sugerido: {generatedData.coverStyle}
                      </div>
                   </div>
                   <ReactMarkdown>{generatedData.content}</ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 h-full min-h-[400px] flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                 <div className="bg-slate-50 p-6 rounded-full mb-4">
                    <BookOpen size={48} className="text-slate-300" />
                 </div>
                 <h3 className="text-lg font-medium text-slate-900">Seu eBook aparecerá aqui</h3>
                 <p className="max-w-sm mt-2">Preencha o formulário ao lado para iniciar a geração automática do seu conteúdo.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Pricing: React.FC = () => {
  useEffect(() => { document.title = "Planos | Milvan eBook Creator"; }, []);

  const plans: PricingPlan[] = [
    {
      name: "Plano Free",
      price: "0 MT",
      features: ["1 eBook por mês", "Capas básicas geradas por IA", "Downloads com marca d'água", "Acesso ao suporte comunitário"],
      buttonText: "Começar Grátis",
      isPopular: false
    },
    {
      name: "Plano Premium",
      price: "990 MT",
      period: "/mês",
      features: ["Geração ILIMITADA de eBooks", "Capas Premium Personalizáveis", "Download em PDF sem marca d'água", "Editor de texto avançado", "Direitos Comerciais (Revenda)", "Suporte Prioritário 24h"],
      buttonText: "Assinar Agora",
      isPopular: true
    }
  ];

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900">Invista no seu Futuro Digital</h1>
          <p className="mt-4 text-xl text-slate-600">Escolha o plano ideal para escalar suas vendas.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative rounded-2xl p-8 ${plan.isPopular ? 'bg-white border-2 border-blue-600 shadow-xl scale-105 z-10' : 'bg-slate-100 border border-slate-200'}`}>
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                  MAIS POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
              <div className="mt-4 flex items-baseline text-slate-900">
                <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                {plan.period && <span className="ml-1 text-xl font-semibold text-slate-500">{plan.period}</span>}
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="flex-shrink-0 w-5 h-5 text-green-500" />
                    <span className="ml-3 text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to={plan.name === "Plano Premium" ? "/contact" : "/create"} className={`block w-full text-center px-6 py-4 rounded-xl font-bold transition-all ${plan.isPopular ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                  {plan.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Blog: React.FC = () => {
  useEffect(() => { document.title = "Blog | Dicas de Vendas Digitais"; }, []);

  const posts: BlogPost[] = [
    { id: 1, title: "Como criar eBooks que vendem todo dia", excerpt: "Descubra a estrutura secreta dos best-sellers digitais.", category: "Vendas", imageUrl: "https://picsum.photos/seed/ebooks/800/600" },
    { id: 2, title: "Marketing Digital em Moçambique: Guia 2024", excerpt: "As melhores estratégias para o mercado local.", category: "Marketing", imageUrl: "https://picsum.photos/seed/mkt/800/600" },
    { id: 3, title: "5 Nichos Lucrativos para começar hoje", excerpt: "Saúde, Finanças e muito mais. Veja onde está o dinheiro.", category: "Ideias", imageUrl: "https://picsum.photos/seed/niche/800/600" },
    { id: 4, title: "Como usar IA para escalar sua produção", excerpt: "Não perca tempo escrevendo. Veja como a IA ajuda.", category: "Tecnologia", imageUrl: "https://picsum.photos/seed/ai/800/600" },
    { id: 5, title: "Tráfego Pago vs Orgânico: Qual escolher?", excerpt: "Onde investir seu dinheiro para vender seu eBook.", category: "Estratégia", imageUrl: "https://picsum.photos/seed/traffic/800/600" },
    { id: 6, title: "Guia para Iniciantes: Do zero à primeira venda", excerpt: "O passo a passo completo para sair do zero.", category: "Iniciantes", imageUrl: "https://picsum.photos/seed/start/800/600" },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900">Blog Milvan</h1>
          <p className="mt-4 text-xl text-slate-600">Dicas, estratégias e novidades para criadores digitais.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-48 overflow-hidden bg-slate-200 relative">
                 <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-800 uppercase">
                    {post.category}
                 </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{post.excerpt}</p>
                <Link to={`/blog`} className="inline-flex items-center text-blue-600 font-medium hover:underline">
                  Ler artigo <ChevronRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  useEffect(() => { document.title = "FAQ | Perguntas Frequentes"; }, []);

  const items: FaqItem[] = [
    { question: "Como a IA cria o eBook?", answer: "Nossa IA (Inteligência Artificial) foi treinada com milhões de livros e artigos. Ela entende seu tema, estrutura o conhecimento e escreve um texto original, coerente e formatado, como se fosse um humano especialista." },
    { question: "Posso vender os eBooks gerados?", answer: "Sim! No Plano Premium, você tem 100% dos direitos comerciais e autorais sobre o conteúdo gerado. Você pode vender na Hotmart, Amazon Kindle ou diretamente no WhatsApp." },
    { question: "O conteúdo é livre de plágio?", answer: "Sim. A IA gera conteúdo original palavra por palavra baseado no seu pedido. Recomendamos sempre revisar, mas o texto é único." },
    { question: "Como funciona o pagamento do Premium?", answer: "Aceitamos M-Pesa, e-Mola e Transferência Bancária. O acesso é liberado imediatamente após a confirmação." },
    { question: "Funciona no celular?", answer: "Perfeitamente. Nossa plataforma é 100% otimizada para smartphones, tablets e computadores." },
    { question: "Qual a diferença do Plano Free?", answer: "O plano Free é para teste: você cria 1 eBook com marca d'água. O Premium é para profissionais: ilimitado, sem marca, com suporte e revenda liberada." },
    { question: "Posso editar o texto depois?", answer: "Sim! O texto é gerado em formato editável. Você pode adicionar seus próprios toques, histórias pessoais e imagens antes de exportar o PDF final." },
  ];

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-slate-900">Perguntas Frequentes</h1>
          <p className="mt-4 text-lg text-slate-600">Tire suas dúvidas sobre o Milvan eBook Creator.</p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <details key={index} className="group bg-white rounded-xl shadow-sm border border-slate-200">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-slate-900 group-open:text-blue-600 transition-colors">
                <span>{item.question}</span>
                <span className="transition group-open:rotate-180">
                  <ChevronRight />
                </span>
              </summary>
              <div className="text-slate-600 px-6 pb-6 animate-fade-in">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  useEffect(() => { document.title = "Contato | Suporte 24h"; }, []);

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-6">Fale Conosco</h1>
            <p className="text-lg text-slate-600 mb-8">
              Tem alguma dúvida ou precisa de suporte para criar seu eBook? Nossa equipe está online 24h para te ajudar.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase">WhatsApp (Rápido)</p>
                  <p className="text-lg font-medium text-slate-900">{CONTACT_INFO.whatsapp}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase">Email</p>
                  <p className="text-lg font-medium text-slate-900">{CONTACT_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                  <Instagram size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase">Instagram</p>
                  <p className="text-lg font-medium text-slate-900">{CONTACT_INFO.instagram}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
            <h3 className="text-xl font-bold mb-6">Envie uma mensagem</h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Mensagem enviada! Entraremos em contato em breve."); }}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Seu nome" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email ou WhatsApp</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contato" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mensagem</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Como podemos ajudar?" required></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-slate-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/create" element={<CreateEbook />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;