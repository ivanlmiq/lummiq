declare global {
    interface PageParams {
        id: string;
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
