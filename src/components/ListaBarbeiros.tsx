// src/components/ListaBarbeiros.tsx
import { useBarbeiros } from "../hooks/useBarbeiros";

export function ListaBarbeiros() {
  const barbeiros = useBarbeiros();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {barbeiros.map(b => (
        <div key={b.id} className="bg-white rounded-xl shadow-md p-4">
          <img src={b.imagem} alt={b.nome} className="w-full h-40 object-cover rounded-md" />
          <h3 className="text-lg font-semibold mt-2">{b.nome}</h3>
          <p className="text-sm text-gray-600">{b.descricao}</p>
        </div>
      ))}
    </div>
  );
}
