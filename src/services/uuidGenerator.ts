import { UuidService } from '../application/ports';
import { v4 as uuidv4 } from 'uuid';

export function useUuidGenerator(): UuidService {
  return {
    generateUuid() {
      return uuidv4();
    },
  };
}
