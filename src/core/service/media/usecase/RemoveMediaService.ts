import { Code } from '@core/common/code/Code';
import { MediaRemovedEvent } from '@core/common/cqers/event/events/media/MediaRemovedEvent';
import { Exception } from '@core/common/exception/Exception';
import { EventBusPort } from '@core/common/port/cqers/EventBusPort';
import { CoreAssert } from '@core/common/util/assert/CoreAssert';
import { Media } from '@core/domain/media/entity/Media';
import { MediaRepositoryPort } from '@core/domain/media/port/persistence/MediaRepositoryPort';
import { RemoveMediaPort } from '@core/domain/media/port/usecase/RemoveMediaPort';
import { RemoveMediaUseCase } from '@core/domain/media/usecase/RemoveMediaUseCase';

export class RemoveMediaService implements RemoveMediaUseCase {
  
  constructor(
    private readonly mediaRepository: MediaRepositoryPort,
    private readonly eventBus: EventBusPort,
  ) {}
  
  public async execute(payload: RemoveMediaPort): Promise<void> {
    const media: Media = CoreAssert.notEmpty(
      await this.mediaRepository.findMedia({id: payload.mediaId}),
      Exception.new({code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Media not found.'})
    );
  
    const hasAccess: boolean = payload.executorId === media.getOwnerId();
    CoreAssert.isTrue(hasAccess, Exception.new({code: Code.ACCESS_DENIED_ERROR}));
    
    await this.mediaRepository.removeMedia(media);
    await this.eventBus.sendEvent(MediaRemovedEvent.new(media.getId(), media.getOwnerId(), media.getType()));
  }
  
}
