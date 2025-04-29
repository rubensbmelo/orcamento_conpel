import QuoteForm from '@/components/QuoteForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-gray-50">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#804000]">Gerador de Orçamento Conpel</h1>
        <QuoteForm />
      </div>
    </main>
  );
}

