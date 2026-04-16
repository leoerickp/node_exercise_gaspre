import { rootStore } from "../../domain/datasources/category/root.datasource";
import { buildIndex } from "../../shared/utils/build-index.utils";
import { detectCycle } from "../../shared/utils/detect-cycle.utils";

export class BuildTreeUseCase {
  execute(newRoot: any): any {
    if(detectCycle(newRoot)){
      throw new Error('Cycle detected');
    }
    const map = buildIndex(newRoot);
    if(map.size === 0){
      throw new Error('Empty tree');
    }      
    rootStore.set(newRoot);
    return newRoot;    
  }

}