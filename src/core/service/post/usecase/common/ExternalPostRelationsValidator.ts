import { QueryBusPort } from '../../../../common/port/cqers/QueryBusPort';
import { DoesMediaExistQuery } from '../../../../common/cqers/query/queries/media/DoesMediaExistQuery';
import { DoesMediaExistQueryResult } from '../../../../common/cqers/query/queries/media/result/DoesMediaExistQueryResult';
import { Exception } from '../../../../common/exception/Exception';
import { Code } from '../../../../common/code/Code';

export type PostValidationRelations = {
  image?: PostImageValidationInfo,
};

export type PostImageValidationInfo = {
  id: string,
  ownerId: string
};

export class ExternalPostRelationsValidator {
  
  public static async validate(relations: PostValidationRelations, queryBus: QueryBusPort): Promise<void> {
    if (relations.image) {
      await this.validateImage(relations.image, queryBus);
    }
  }
  
  private static async validateImage(image: PostImageValidationInfo, queryBus: QueryBusPort): Promise<void> {
    const doesImageExistQuery: DoesMediaExistQuery = DoesMediaExistQuery.new({id: image.id, ownerId: image.ownerId});
    const doesImageExistQueryResult: DoesMediaExistQueryResult = await queryBus.sendQuery(doesImageExistQuery);
  
    if (!doesImageExistQueryResult.doesExist) {
      throw Exception.new({code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Post image not found.'});
    }
  }
  
}