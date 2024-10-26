declare module 'redux-persist/lib/storage' {
    import { Storage } from 'redux-persist/es/types';
  
    const storage: Storage;
    export default storage;
  }


declare module 'redux-persist/es/persistReducer' {
  import { PersistReducer } from 'redux-persist/es/types';

  const persistReducer: PersistReducer;
  export default persistReducer;
}