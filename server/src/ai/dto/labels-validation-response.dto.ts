class ResponseLabelItemDto {
    id: number;
    name: string;
    valid: boolean;
}

export class LabelsValidationResponseDto {
    labels: ResponseLabelItemDto[];
}