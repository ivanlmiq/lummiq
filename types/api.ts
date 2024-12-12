export type GenericApiParams = {
    schoolId: string;
};

export type GenericApiParamsWithId = GenericApiParams & {
    id: string;
};
