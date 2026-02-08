// Dados Mockados compartilhados entre componentes

export const OFICINAS_MOCK = [
  { 
    id: 1, 
    nome: "Mecânica Dois Irmãos", 
    distancia: "500m", 
    preco_extra: 0,
    nota: 4.8,
    endereco: "Rua das Acácias, 123"
  },
  { 
    id: 2, 
    nome: "AutoCenter Brasil", 
    distancia: "1.3km", 
    preco_extra: 20,
    nota: 4.9,
    endereco: "Av. Central, 4500"
  },
  { 
    id: 3, 
    nome: "Oficina Sertanejo", 
    distancia: "2.0km", 
    preco_extra: -10,
    nota: 4.6,
    endereco: "Rua do Comércio, 88"
  }
];

export const SERVICOS_INICIAIS = [
  { id: 1, nome: "Troca de Óleo", icon: "droplet" },
  { id: 2, nome: "Freios (Pastilhas)", icon: "disc" },
  { id: 3, nome: "Filtros", icon: "wind" },
  { id: 4, nome: "Bateria", icon: "battery" },
];