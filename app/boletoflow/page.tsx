"use client";
import { useState } from "react";

export default function BoletoFlow() {
  const [faturas, setFaturas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const processarArquivo = async (evento: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = evento.target.files?.[0];
    if (!arquivo) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("arquivo", arquivo);

    try {
      // Dispara contra o servidor Python em segundo plano
      const resposta = await fetch("https://regexengineforbills.onrender.com/api/extrair", {
        method: "POST",
        body: formData,
      });
      
      const json = await resposta.json();

      if (json.status === "sucesso") {
        // Acumula os novos boletos com os que já estavam na tela
        setFaturas((estadoAnterior) => [...estadoAnterior, ...json.boletos]);
      } else {
        alert(json.mensagem); 
      }
    } catch (erro) {
      alert("O servidor de extração falhou ou está offline.");
    } finally {
      setLoading(false);
      // Limpa o input para permitir o upload do mesmo arquivo se necessário
      evento.target.value = ''; 
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 text-black">
      
      {/* 1. PAINEL DE CONTROLE (Obliterado na Impressão) */}
      <div className="print:hidden mb-12 bg-white p-6 shadow rounded border border-gray-200">
        <h1 className="text-3xl font-bold mb-2">BoletoFlow Engine</h1>
        <p className="text-gray-600 mb-6">Processe seus arquivos PDF. O sistema acumulará os resultados abaixo.</p>
        
        <input 
          type="file" 
          accept="application/pdf"
          onChange={processarArquivo} 
          disabled={loading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
        />
        {loading && <p className="mt-4 text-yellow-600 font-medium animate-pulse">Varrendo geometria do documento...</p>}
      </div>

      {/* 2. ÁREA DE RESULTADOS (Visível na Tela e na Folha A4) */}
      {faturas.length > 0 && (
        <div className="print:m-0">
          
          {/* Cabeçalho de Resultados: Os botões somem na impressão */}
          <div className="print:hidden flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800">Lote Extraído ({faturas.length})</h2>
            <button 
              onClick={() => window.print()} 
              className="bg-black text-white px-6 py-2 rounded font-medium hover:bg-gray-800 transition-colors"
            >
              Imprimir Comprovantes
            </button>
          </div>

          {/* O Relatório: Quebras de página controladas */}
          <div className="space-y-4 print:space-y-6">
            {faturas.map((fatura, indice) => (
              <div 
                key={indice} 
                className="bg-gray-50 border border-gray-200 p-6 rounded print:bg-transparent print:border-b print:border-gray-400 print:rounded-none print:p-2 print:break-inside-avoid"
              >
                <p className="text-sm text-gray-500 uppercase tracking-wide print:text-black">Linha Digitável</p>
                <p className="font-mono text-sm sm:text-base tracking-tight mb-4 text-black">{fatura.codigo}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 print:text-black">Vencimento</p>
                    <p className="font-bold text-lg">{fatura.vencimento}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 print:text-black">Valor (R$)</p>
                    <p className="font-bold text-lg">{fatura.valor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      )}
    </div>
  );
}
