export default interface IService<M,T> {
  getById(id:T):Promise<M|null>;
  getAll():Promise<M[]>;
  delete(id:T):Promise<boolean>;
  add(model:M):Promise<M|null>;
  update(id:T,model:M):Promise<M|null>;
};