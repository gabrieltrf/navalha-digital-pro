import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export function EditarServico() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");

  useEffect(() => {
    async function carregarServico() {
      const docRef = doc(db, "servicos", id!);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const dados = docSnap.data();
        setNome(dados.nome);
        setDescricao(dados.descricao);
        setPreco(dados.preco.toString());
        setImagem(dados.imagem || "");
      }
    }
    carregarServico();
  }, [id]);

  const handleSalvar = async () => {
    const docRef = doc(db, "servicos", id!);
    await updateDoc(docRef, {
      nome,
      descricao,
      preco: parseFloat(preco),
      imagem,
    });
    navigate("/admin/servicos/listar");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Editar Serviço</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSalvar();
        }}
        className="grid gap-4"
      >
        <Input
          placeholder="Nome do serviço"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <Input
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <Input
          placeholder="URL da imagem (opcional)"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
        />
        <Button type="submit">Salvar Alterações</Button>
      </form>
    </div>
  );
}
