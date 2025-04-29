import { useState } from "react";

interface ItemProps {
  id: number;
  item: {
    id: number;
    codigo: string;
    descricao: string;
    medidas: string;
    unidade: string;
    quantidade: number;
    precoUnitario: number;
  };
  onItemChange: (id: number, field: string, value: string | number) => void;
  onRemoveItem: (id: number) => void;
}

export default function ItemRow({ id, item, onItemChange, onRemoveItem }: ItemProps) {
  const subtotal = item.quantidade * item.precoUnitario;
  
  return (
    <div className="grid grid-cols-12 gap-2 mb-2 items-center">
      <div className="col-span-2">
        <input
          type="text"
          value={item.codigo}
          onChange={(e) => onItemChange(id, "codigo", e.target.value)}
          className="w-full p-2 border rounded text-sm"
          placeholder="Código"
        />
      </div>
      <div className="col-span-2">
        <input
          type="text"
          value={item.descricao}
          onChange={(e) => onItemChange(id, "descricao", e.target.value)}
          className="w-full p-2 border rounded text-sm"
          placeholder="Descrição"
        />
      </div>
      <div className="col-span-2">
        <input
          type="text"
          value={item.medidas}
          onChange={(e) => onItemChange(id, "medidas", e.target.value)}
          className="w-full p-2 border rounded text-sm"
          placeholder="Medidas"
        />
      </div>
      <div className="col-span-1">
        <select
          value={item.unidade}
          onChange={(e) => onItemChange(id, "unidade", e.target.value)}
          className="w-full p-2 border rounded text-sm"
        >
          <option value="Milheiro">Milheiro</option>
          <option value="Unidade">Unidade</option>
          <option value="Caixa">Caixa</option>
        </select>
      </div>
      <div className="col-span-1">
        <input
          type="number"
          value={item.quantidade}
          onChange={(e) => onItemChange(id, "quantidade", parseFloat(e.target.value) || 0)}
          className="w-full p-2 border rounded text-sm"
          placeholder="Qtd."
          min="0"
          step="0.001"
        />
      </div>
      <div className="col-span-2">
        <div className="flex items-center">
          <span className="mr-1">R$</span>
          <input
            type="number"
            value={item.precoUnitario}
            onChange={(e) => onItemChange(id, "precoUnitario", parseFloat(e.target.value) || 0)}
            className="w-full p-2 border rounded text-sm"
            placeholder="Preço Unit."
            min="0"
            step="0.01"
          />
        </div>
      </div>
      <div className="col-span-1">
        <div className="text-right font-medium">
          R$ {subtotal.toFixed(2)}
        </div>
      </div>
      <div className="col-span-1">
        <button
          type="button"
          onClick={() => onRemoveItem(id)}
          className="p-1 text-red-600 hover:text-red-800"
        >
          Remover
        </button>
      </div>
    </div>
  );
}
