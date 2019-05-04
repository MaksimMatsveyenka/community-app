import { FrontEndValidationErrorsEventRegister  } from 'models';

export const frontEndValidationEventRegister: FrontEndValidationErrorsEventRegister = {
    title: {
        length: 'titleLengthError',
        required: 'titleRequired'
    },
    description: {
        length: 'descriptionApplicationLengthError',
        required: 'descriptionRequired'
    },
    city: {
        length: 'cityLengthError',
        required: 'cityRequired'
    },
    begginingInTime: {
        length: 'begginingInTimeLengthError',
        required: 'begginingInTimeRequired'
    },
    begginingDate: {
        length: 'begginingDateLengthError',
        required: 'begginingDateRequired'
    },
    isPublicEvent: {
        length: 'isPublicEventLengthError',
        required: 'isPublicEventRequired'
    },
    isOnlineEvent: {
        length: 'isOnlineEventLengthError',
        required: 'isOnlineEventRequired'
    }
};
