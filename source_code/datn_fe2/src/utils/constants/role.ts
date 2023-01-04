export const ROLES = {
    STUDENT: 'Student',
    BUSINESS: 'Business',
    ADMIN: 'Admin',
}

function convertStrToArr(roles: string | null): Array<string> {
    if (roles == null) {
        return [];
    } else {
        var arr: Array<string> = [];
        arr = roles.split("/");
        return arr;
    }
    
}

export {convertStrToArr};