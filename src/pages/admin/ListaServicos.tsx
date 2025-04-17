import { useServicos } from "@/hooks/useServicos";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ListaServicos() {
  const servicos = useServicos();
  const navigate = useNavigate();

  const handleEditar = (id: string) => {
    navigate(`/admin/servicos/editar/${id}`);
  };

  const handleExcluir = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este serviço?")) {
      const { deleteDoc, doc } = await import("firebase/firestore");
      const { db } = await import("@/firebase");
      await deleteDoc(doc(db, "servicos", id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Serviços Cadastrados</h2>
      <div className="grid gap-4">
        {servicos.map((servico) => (
          <div
            key={servico.id}
            className="bg-barber-dark-alt p-4 rounded-lg border border-white/10 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg text-white font-semibold">{servico.nome}</h3>
              <p className="text-muted-foreground">{servico.descricao}</p>
              <p className="text-primary font-bold mt-1">R$ {servico.preco.toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleEditar(servico.id)}>
                <Pencil className="w-4 h-4 mr-1" /> Editar
              </Button>
              <Button variant="destructive" onClick={() => handleExcluir(servico.id)}>
                <Trash2 className="w-4 h-4 mr-1" /> Excluir
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
