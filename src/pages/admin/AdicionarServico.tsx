import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AdicionarServico() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [duracao, setDuracao] = useState("");
  const [icone, setIcone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "servicos"), {
        nome,
        descricao,
        preco: parseFloat(preco),
        duracao,
        icone,
      });
      toast.success("Serviço adicionado com sucesso!");
      setNome("");
      setDescricao("");
      setPreco("");
      setDuracao("");
      setIcone("");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao adicionar serviço.");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-white mb-6">Adicionar Serviço</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="nome">Nome</Label>
          <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="preco">Preço (em reais)</Label>
          <Input
            id="preco"
            type="number"
            step="0.01"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="duracao">Duração</Label>
          <Input id="duracao" value={duracao} onChange={(e) => setDuracao(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="icone">Ícone (ex: scissors, package, ruler...)</Label>
          <Input id="icone" value={icone} onChange={(e) => setIcone(e.target.value)} />
        </div>

        <Button type="submit" className="w-full">
          Salvar Serviço
        </Button>
      </form>
    </div>
  );
}
