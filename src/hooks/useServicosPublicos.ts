import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export interface Servicos {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
  popular: boolean;
  discount?: string;
  categoria: string;
}

export function useServicosPublicos() {
  const [servicos, setServicos] = useState<Servicos[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const servicosSnap = await getDocs(collection(db, "servicos"));
      const servicosList = servicosSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Servicos[];
      setServicos(servicosList);
    };

    fetchData();
  }, []);

  return servicos;
}
