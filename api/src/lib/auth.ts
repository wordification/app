import type { Role } from '@prisma/client'

import type { Decoded } from '@redwoodjs/api'
import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from './db'

/**
 * The session object sent in as the first argument to getCurrentUser() will
 * have a single key `id` containing the unique ID of the logged in user
 * (whatever field you set as `authFields.id` in your auth function config).
 * You'll need to update the call to `db` below if you use a different model
 * name or unique field name, for example:
 *
 *   return await db.profile.findUnique({ where: { email: session.id } })
 *                   ───┬───                       ──┬──
 *      model accessor ─┘      unique id field name ─┘
 *
 * !! BEWARE !! Anything returned from this function will be available to the
 * client--it becomes the content of `currentUser` on the web side (as well as
 * `context.currentUser` on the api side). You should carefully add additional
 * fields to the `select` object below once you've decided they are safe to be
 * seen if someone were to open the Web Inspector in their browser.
 */
export const getCurrentUser = async (session: Decoded) => {
  if (!session || typeof session.id !== 'number') {
    throw new Error('Invalid session')
  }

  return await db.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      roles: true,
    },
  })
}

/**
 * The user is authenticated if there is a currentUser in the context
 *
 * @returns {boolean} - If the currentUser is authenticated
 */
export const isAuthenticated = () => {
  return !!context.currentUser
}

/**
 * When checking role membership, roles can be a single value, a list, or none.
 * You can use Prisma enums too (if you're using them for roles), just import your enum type from `@prisma/client`
 */
type AllowedRoles = Role | Role[] | undefined

/**
 * Checks if the currentUser is authenticated (and assigned one of the given roles)
 *
 * @param roles {@link AllowedRoles}: Checks if the currentUser is assigned one of these roles
 *
 * @returns true if the currentUser is logged in and assigned one of the given roles, or when no roles are provided to check against. Otherwise returns false.
 */
export const hasRole = (roles: AllowedRoles) => {
  if (!isAuthenticated()) {
    return false
  }
  if (!roles) {
    return true
  }
  const currentUserRole = context.currentUser?.roles

  if (typeof roles === 'string') {
    return currentUserRole === roles
  }
  if (roles.length === 0) {
    return true
  }
  return roles.some((allowedRole) => currentUserRole === allowedRole)
}

/**
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @param roles: {@link AllowedRoles} - When checking role membership, these roles grant access.
 *
 * @returns - If the currentUser is authenticated (and assigned one of the given roles)
 *
 * @throws `AuthenticationError` - If the currentUser is not authenticated
 * @throws `ForbiddenError` If the currentUser is not allowed due to role permissions
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const requireAuth = ({ roles }: { roles?: AllowedRoles } = {}) => {
  if (!isAuthenticated()) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (roles && !hasRole(roles)) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}
