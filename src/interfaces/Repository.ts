export interface RepositoryBase<T, CreateDTO, UpdateDTO> {
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T | null>;
  create(data: CreateDTO): Promise<T>;
  update(id: number, data: UpdateDTO): Promise<T>;
  delete(id: number): Promise<void>;
}
