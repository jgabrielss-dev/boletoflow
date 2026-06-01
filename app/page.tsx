import Link from 'next/link';

export default function SynthesisHome() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-8">
      <div className="max-w-2xl w-full">
        {/* A Marca */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Synthesis BR.
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-12 border-l-2 border-gray-700 pl-4">
          Engenharia de software tática e automação de dados B2B. Construindo infraestrutura invisível para operações de alto volume.
        </p>

        {/* O Ecossistema de Produtos */}
        <div className="space-y-6">
          <h2 className="text-sm uppercase tracking-widest text-gray-500 font-semibold">Ecossistema Ativo</h2>
          
          <Link href="/boletoflow" className="block group">
            <div className="border border-gray-800 bg-gray-900 p-6 rounded hover:border-gray-600 transition-colors">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">BoletoFlow Engine</h3>
              <p className="text-gray-400 text-sm">
                Plataforma de extração vetorial e processamento em lote de faturas financeiras. Elimine o gargalo do fluxo de caixa.
              </p>
            </div>
          </Link>
        </div>

        {/* Rodapé Corporativo */}
        <div className="mt-24 pt-8 border-t border-gray-900 text-gray-600 text-sm flex justify-between">
          <p>© {new Date().getFullYear()} Synthesis BR. Todos os direitos reservados.</p>
          <p>Maceió, AL - Brasil</p>
        </div>
      </div>
    </div>
  );
}