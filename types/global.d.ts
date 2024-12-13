declare global {
    interface PageParamsById {
        id: string;
        schoolId: string;
    }

    interface PageParams {
        schoolId: string;
    }

    interface SessionUser {
        id: string;
        name: string;
        email: string;
        // image: string;
    }
}

export {};
