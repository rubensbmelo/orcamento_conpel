"use client";

import { useState } from "react";
import ItemRow from "./ItemRow"; // Import the ItemRow component

interface Item {
  id: number;
  codigo: string;
  descricao: string;
  medidas: string;
  unidade: string;
  quantidade: number;
  precoUnitario: number;
}

export default function QuoteForm() {
  const [razaoSocial, setRazaoSocial] = useState("COMPANHIA SULAMERICANA ( ECOCRISTAL )"); // Example data
  const [endereco, setEndereco] = useState("RUA NORMA DE ARAUJO BATISTA, 951 - GALPADG"); // Example data
  const [contatoNome, setContatoNome] = useState("Elidiane"); // Example data
  const [contatoEmail, setContatoEmail] = useState("estoque@ecocristalpb.com.br"); // Example data
  const [cnpj, setCnpj] = useState("09.256.116/0001-60"); // Example data
  const [telefone, setTelefone] = useState("(83) 3216-5000"); // Example data

  const [propostaNum, setPropostaNum] = useState("PROP-001-2025"); // Example data
  const [dataEmissao, setDataEmissao] = useState(new Date().toISOString().split("T")[0]);
  const [validade, setValidade] = useState("20"); // Default 20 dias

  const [items, setItems] = useState<Item[]>([
    { id: 1, codigo: "251011347-CX", descricao: "CAIXA 400G FRUTAS", medidas: "614 X 294 X 503", unidade: "Milheiro", quantidade: 2.000, precoUnitario: 4711.77 },
    { id: 2, codigo: "251011348-CX", descricao: "CAIXA 500G FRUTAS", medidas: "560 X 474 X 378", unidade: "Milheiro", quantidade: 2.000, precoUnitario: 5725.59 },
    { id: 3, codigo: "251010973-CX", descricao: "CAIXA BANDEJA MEDIA", medidas: "610 X 420 X 577", unidade: "Milheiro", quantidade: 2.000, precoUnitario: 6664.62 },
    { id: 4, codigo: "251011285-CX", descricao: "ESTOJO 20 OVOS", medidas: "680 X 410 X 490", unidade: "Milheiro", quantidade: 2.000, precoUnitario: 6365.46 },
    { id: 5, codigo: "251011368-CX", descricao: "CUMBUCA TOMATE", medidas: "620 X 450 X 220", unidade: "Milheiro", quantidade: 2.000, precoUnitario: 4661.91 },
  ]); // Example data

  const [prazoPagamento, setPrazoPagamento] = useState("21/28 DD");
  const [frete, setFrete] = useState("CIF");
  const [prazoEntrega, setPrazoEntrega] = useState("15 dias após confirmação");
  const [icms, setIcms] = useState("20");
  const [icmsIncluso, setIcmsIncluso] = useState(true);
  const [ipi, setIpi] = useState("15");
  const [ipiIncluso, setIpiIncluso] = useState(false);

  const [representante, setRepresentante] = useState("Rubens Bandeira - (81) 97318-8452");

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), codigo: "", descricao: "", medidas: "", unidade: "Milheiro", quantidade: 0, precoUnitario: 0 }]);
  };

  const handleItemChange = (id: number, field: keyof Item, value: string | number) => {
    setItems(items.map(item => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subtotalGeral = items.reduce((sum, item) => sum + item.quantidade * item.precoUnitario, 0);
    const valorIpi = ipiIncluso ? 0 : subtotalGeral * (parseFloat(ipi) / 100);
    const valorTotal = subtotalGeral + valorIpi;

    const formData = {
      razaoSocial,
      endereco,
      contatoNome,
      contatoEmail,
      cnpj,
      telefone,
      propostaNum,
      dataEmissao,
      validade,
      items,
      prazoPagamento,
      frete,
      prazoEntrega,
      icms,
      icmsIncluso,
      ipi,
      ipiIncluso,
      representante,
      subtotalGeral,
      valorIpi,
      valorTotal
    };

    console.log("Form Data:", formData);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/generate-quote"; // Use environment variable
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Orçamento gerado e enviado com sucesso!");
        // Optionally reset form or redirect
      } else {
        const errorData = await response.json();
        alert(`Erro ao gerar orçamento: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Erro de conexão ao tentar gerar o orçamento.");
    }
  };

  const subtotalGeral = items.reduce((sum, item) => sum + item.quantidade * item.precoUnitario, 0);
  const valorIpi = ipiIncluso ? 0 : subtotalGeral * (parseFloat(ipi) / 100);
  const valorTotal = subtotalGeral + valorIpi;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Cabeçalho Info Proposta */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
         <div>
            <label htmlFor="propostaNum" className="block text-sm font-medium text-gray-700">Proposta Nº</label>
            <input type="text" id="propostaNum" value={propostaNum} onChange={(e) => setPropostaNum(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#804000] focus:ring-[#804000] sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="dataEmissao" className="block text-sm font-medium text-gray-700">Data Emissão</label>
            <input type="date" id="dataEmissao" value={dataEmissao} onChange={(e) => setDataEmissao(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#804000] focus:ring-[#804000] sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="validade" className="block text-sm font-medium text-gray-700">Validade (dias)</label>
            <input type="number" id="validade" value={validade} onChange={(e) => setValidade(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#804000] focus:ring-[#804000] sm:text-sm" min="1" required />
          </div>
      </section>

      {/* Dados do Cliente Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-[#804000]">Dados do Cliente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="razaoSocial" className="block text-sm font-medium text-gray-700">Razão Social</label>
            <input type="text" id="razaoSocial" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#804000] focus:ring-[#804000] sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">CNPJ</label>
            <input type="text" id="cnpj" value={cnpj} onChange={(e) => setCnpj(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#804000] focus:ring-[#804000] sm:text-sm" required />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">Endereço</label>
            <input type="text" id="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#804000] focus:ring-[#804000] sm:text-sm" required />
          </div>
           <div>
            <label htmlFor="contatoNome" className="block text-sm font-medium text-gray-700">Contato (Nome)</label>
            <input type="text" id="contatoNome" value={contatoNome} onChange={(e) => setContatoNome(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#804000] focus:ring-[#804000] sm:text-sm" />
          </div>
           <div>
            <label htmlFor="contatoEmail" className="block text-sm font-medium text-gray-700">Contato (E-mail)</label>
            <input type="email" id="contatoEmail" value={contatoEmail} onChange={(e) => setContatoEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#804000] focus:ring-[#804000] sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
            <input type="tel" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#804000] focus:ring-[#804000] sm:text-sm" />
          </div>
        </div>
      </section>

      {/* Itens do Orçamento Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-[#804000]">Itens do Orçamento</h2>
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-2 mb-2 font-semibold text-sm text-gray-600">
          <div className="col-span-2">Código</div>
          <div className="col-span-2">Descrição</div>
          <div className="col-span-2">Medidas</div>
          <div className="col-span-1">Unid.</div>
          <div className="col-span-1">Qtd.</div>
          <div className="col-span-2">Preço Unit.</div>
          <div className="col-span-1 text-right">Subtotal</div>
          <div className="col-span-1">Ação</div>
        </div>
        {/* Item Rows */}
        {items.map((item) => (
          <ItemRow key={item.id} id={item.id} item={item} onItemChange={handleItemChange} onRemoveItem={handleRemoveItem} />
        ))}
        <button type="button" onClick={handleAddItem} className="mt-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#a0522d] hover:bg-[#804000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#804000]">
          Adicionar Item
        </button>
      </section>

      {/* Condições Comerciais Section */}
      <section>
         <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-[#804000]">Condições Comerciais</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="prazoPagamento" className="block text-sm font-medium text-gray-700">Prazo Pagamento</label>
              <input type="text" id="prazoPagamento" value={prazoPagamento} onChange={(e) => setPrazoPagamento(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#804000] focus:ring-[#804000] sm:text-sm" />
            </div>
            <div>
              <label htmlFor="frete" className="block text-sm font-medium text-gray-700">Frete</label>
              <select id="frete" value={frete} onChange={(e) => setFrete(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#804000] focus:ring-[#804000] sm:text-sm">
                <option value="CIF">CIF</option>
                <option value="FOB">FOB</option>
              </select>
            </div>
            <div>
              <label htmlFor="prazoEntrega" className="block text-sm font-medium text-gray-700">Prazo Entrega</label>
              <input type="text" id="prazoEntrega" value={prazoEntrega} onChange={(e) => setPrazoEntrega(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#804000] focus:ring-[#804000] sm:text-sm" />
            </div>
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <label htmlFor="icms" className="block text-sm font-medium text-gray-700">ICMS (%)</label>
                <input type="number" id="icms" value={icms} onChange={(e) => setIcms(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#804000] focus:ring-[#804000] sm:text-sm" min="0" step="0.01"/>
              </div>
              <div className="flex items-center h-10">
                <input id="icmsIncluso" type="checkbox" checked={icmsIncluso} onChange={(e) => setIcmsIncluso(e.target.checked)} className="h-4 w-4 text-[#804000] border-gray-300 rounded focus:ring-[#804000]" />
                <label htmlFor="icmsIncluso" className="ml-2 block text-sm text-gray-900">Incluso</label>
              </div>
            </div>
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <label htmlFor="ipi" className="block text-sm font-medium text-gray-700">IPI (%)</label>
                <input type="number" id="ipi" value={ipi} onChange={(e) => setIpi(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#804000] focus:ring-[#804000] sm:text-sm" min="0" step="0.01"/>
              </div>
              <div className="flex items-center h-10">
                <input id="ipiIncluso" type="checkbox" checked={ipiIncluso} onChange={(e) => setIpiIncluso(e.target.checked)} className="h-4 w-4 text-[#804000] border-gray-300 rounded focus:ring-[#804000]" />
                <label htmlFor="ipiIncluso" className="ml-2 block text-sm text-gray-900">Incluso</label>
              </div>
            </div>
         </div>
      </section>

      {/* Totais Section */}
      <section className="text-right space-y-1 pr-16">
          <p className="text-sm font-medium text-gray-700">Subtotal: <span className="font-bold text-gray-900">R$ {subtotalGeral.toFixed(2)}</span></p>
          <p className="text-sm font-medium text-gray-700">Impostos (IPI): <span className="font-bold text-gray-900">R$ {valorIpi.toFixed(2)}</span></p>
          <p className="text-lg font-bold text-[#804000]">Valor Total: <span className="text-xl">R$ {valorTotal.toFixed(2)}</span></p>
      </section>

      {/* Representante Section */}
      <section>
         <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-[#804000]">Representante</h2>
         <div>
            <label htmlFor="representante" className="block text-sm font-medium text-gray-700">Representante Conpel</label>
            <input type="text" id="representante" value={representante} onChange={(e) => setRepresentante(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#804000] focus:ring-[#804000] sm:text-sm" />
          </div>
      </section>

      <div className="text-center pt-6">
        <button type="submit" className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-[#804000] hover:bg-[#a0522d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#804000]">
          Gerar e Enviar Orçamento
        </button>
      </div>
    </form>
  );
}

