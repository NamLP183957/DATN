export const ROLES = {
    STUDENT: 'Student',
    BUSINESS: 'Business',
    ADMIN: 'Admin',
}

function convertStrToArr(roles: string): Array<string> {
    var arr: Array<string> = [];
    arr = roles.split("/");
    return arr;
}

export {convertStrToArr};