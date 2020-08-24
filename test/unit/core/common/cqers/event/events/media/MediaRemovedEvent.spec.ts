import { MediaRemovedEvent } from '../../../../../../../../src/core/common/cqers/event/events/media/MediaRemovedEvent';
import { v4 } from 'uuid';
import { MediaType } from '../../../../../../../../src/core/common/enums/MediaEnums';

describe('MediaRemovedEvent', () => {

  describe('new', () => {
  
    test('Expect it creates MediaRemovedEvent instance with required parameters', () => {
      const mediaId: string = v4();
      const ownerId: string = v4();
      const mediaType: MediaType = MediaType.IMAGE;
      
      const mediaRemovedEvent: MediaRemovedEvent = MediaRemovedEvent.new(mediaId, ownerId, mediaType);
      
      expect(mediaRemovedEvent.mediaId).toBe(mediaId);
      expect(mediaRemovedEvent.ownerId).toBe(ownerId);
      expect(mediaRemovedEvent.type).toBe(mediaType);
    });
    
  });
  
});
