import { Event, EventForSettingForm,  SettingFormType } from 'models';

export interface EventFormState {
    id?: number;
    title: string;
    description: string;
    city: string;
    begginingInTime: string;
    begginingDate: string;
    createAt?: Date;
    updatedAt?: Date;
    isPublicEvent: boolean;
    checkboxPublic: boolean;
    checkboxPersonal: boolean;
    isOnlineEvent: boolean;
    checkboxOnline: boolean;
    checkboxOffline: boolean;
    isTitleValid: boolean;
    isDescriptionValid: boolean;
    isCityValid: boolean;
    isBegginigInTimeValid: boolean;
    isBegginigIDateValid: boolean;
    touched: {
        title: boolean;
        description: boolean;
        city: boolean;
        begginingInTime: boolean;
        begginingDate: boolean;
        isPublicEvent: boolean;
        isOnlineEvent: boolean;
    };
    titleErrors: string[];
    descriptionErrors: string[];
    cityErrors: string[];
    begginingInTimeErrors: string[];
    begginingDateErrors: string[];
}

export interface EventFormProps {
    id?: number;
    userId: number;
    config: SettingFormType;
    model: EventForSettingForm;
    submit(payload: { event: Event, userId: number }): void;
}
