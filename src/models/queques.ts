export type CreateQueques = {
  id: number;
  nombre: string;
  createdAt: Date;
};

export type UpdateQueques = {
  id: number;
  nombre: string;
  createdAt: Date;
};

// src/models/QuequeIngrediente.ts
export interface QuequeIngredienteInput {
  id: number;
  cantidad: number;
}
