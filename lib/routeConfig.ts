type Role = "admin" | "teacher" | "student" | "parent";
type RouteAccessMap = {
    [key: string]: Role[];
};

export const STATIC_ROUTES = {
    dashboard: "/dashboard",
    students: "/students",
    teachers: "/teachers",
    parents: "/parents",
    classes: "/classes",
    lessons: "/lessons",
    exams: "/exams",
    grades: "/grades",
    assignments: "/assignments",
    results: "/results",
    attendance: "/attendance",
    events: "/events",
    announcements: "/announcements",
    signin: "/login",
    signup: "/register",
    // settings
    schools: "/schools",
    teams: "/teams",
    integrations: "/integrations",
    billing: "/billing",
};

export const STATIC_API_AREA = {
    api: "/api",
};

export const ROUTES = new Map<string, string>([
    ["dashboard", STATIC_ROUTES.dashboard],
    ["students", STATIC_ROUTES.students],
    ["teachers", STATIC_ROUTES.teachers],
    ["parents", STATIC_ROUTES.parents],
    ["classes", STATIC_ROUTES.classes],
    ["lessons", STATIC_ROUTES.lessons],
    ["exams", STATIC_ROUTES.exams],
    ["grades", STATIC_ROUTES.grades],
    ["assignments", STATIC_ROUTES.assignments],
    ["results", STATIC_ROUTES.results],
    ["attendance", STATIC_ROUTES.attendance],
    ["events", STATIC_ROUTES.events],
    ["announcements", STATIC_ROUTES.announcements],
]);

export const routeAccessMap: RouteAccessMap = {
    "/admin(.*)": ["admin"],
    "/student(.*)": ["student"],
    "/teacher(.*)": ["teacher"],
    "/parent(.*)": ["parent"],
    "/list/teachers": ["admin", "teacher"],
    "/list/students": ["admin", "teacher"],
    "/list/parents": ["admin", "teacher"],
    "/list/subjects": ["admin"],
    "/list/classes": ["admin", "teacher"],
    "/list/exams": ["admin", "teacher", "student", "parent"],
    "/list/assignments": ["admin", "teacher", "student", "parent"],
    "/list/results": ["admin", "teacher", "student", "parent"],
    "/list/attendance": ["admin", "teacher", "student", "parent"],
    "/list/events": ["admin", "teacher", "student", "parent"],
    "/list/announcements": ["admin", "teacher", "student", "parent"],
};
