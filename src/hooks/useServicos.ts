import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export interface Servicos {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem?: string;
  duracao?: string;
  icone: string;
}

export function useServicos() {
  const [servicos, setServicos] = useState<Servicos[]>([]);

  useEffect(() => {
    async function fetchServicos() {
      const ref = collection(db, "servicos");
      const snap = await getDocs(ref);
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Servicos[];
      setServicos(data);
    }

    fetchServicos();
  }, []);

  return servicos;
}
