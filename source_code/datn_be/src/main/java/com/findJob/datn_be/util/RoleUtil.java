package com.findJob.datn_be.util;

import com.findJob.datn_be.model.Role;

import java.util.Iterator;
import java.util.Set;

public class RoleUtil {

    public static String convertRoleToString(Set<Role> setRoles) {
        String roleStr = "";
        Iterator<Role> itr = setRoles.iterator();
        while (itr.hasNext()) {
            roleStr += itr.next().toString() + "/";
        }

        return roleStr.substring(0, roleStr.length() - 1);
    }
}
