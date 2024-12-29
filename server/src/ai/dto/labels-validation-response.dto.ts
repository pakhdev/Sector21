class ResponseLabelItemDto {
    remoteId: number;
    name: string;
    isValid: boolean;
    notValidReason: string;
}

export class LabelsValidationResponseDto {
    labels: ResponseLabelItemDto[];
}