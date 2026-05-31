// Importa o tipo 'Metadata' do Next.js para garantir que o objeto de metadados siga a estrutura correta.
import type { Metadata } from "next";
import './globals.css'

// Define os metadados da página (o título que aparece na aba do navegador e a descrição para o Google).
export const metadata: Metadata = {
  title: "Leitor de PDF",
  description: "Envie seu PDF para análise",
};

// Este é o componente principal do Layout. 
// Ele recebe 'children', que representa a página atual (o seu page.tsx) que será renderizada dentro dele.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // TypeScript: Define que 'children' pode ser qualquer elemento visual válido do React.
}) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Criamos uma tag <main> com estilos em linha simples para centralizar e limitar a largura do conteúdo na tela */}
        <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
          
          {/* Aqui é onde o conteúdo do seu page.tsx será inserido automaticamente pelo Next.js */}
          {children}
          
        </main>
      </body>
    </html>
  );
}
