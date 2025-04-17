// src/hooks/useBarbeiros.ts
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

interface Barbeiro {
  id: string;
  nome: string;
  imagem: string;
  descricao: string;
  especialidade: string;
  experiencia: string;
  avaliacoes: number;
  nota: number;

  
}

export function useBarbeiros() {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);

  useEffect(() => {
    async function fetchBarbeiros() {
      const snapshot = await getDocs(collection(db, "barbeiros"));
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Barbeiro[];
      setBarbeiros(lista);
    }

    fetchBarbeiros();
  }, []);

  return barbeiros;
}
