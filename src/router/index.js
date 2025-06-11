import AppLayout from '@/layout/AppLayout.vue';
import { useAuthStore } from '@/store/Auth';
import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/session',
                    name: 'session',
                    component: () => import('@/views/pages/sessions/SessionListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/createSession',
                    name: 'session create',
                    component: () => import('@/views/pages/sessions/SessionCreate.vue')
                },
                   {
                    path: '/updateSession/:id',
                    name: 'session update',
                    component: () => import('@/views/pages/sessions/SessionUpdate.vue')
                },
                {
                    path: '/roles',
                    name: 'roles',
                    component: () => import('@/views/pages/roles/RoleListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/createRole',
                    name: 'rol create',
                    component: () => import('@/views/pages/roles/RoleCreate.vue')
                },
                   {
                    path: '/updateRole/:id',
                    name: 'rol update',
                    component: () => import('@/views/pages/roles/RoleUpdate.vue')
                },
                {
                    path: '/rolPermission',
                    name: 'rol permission',
                    component: () => import('@/views/pages/rolepermissions/RolePermissionListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/createRolePermission',
                    name: 'rol permission create',
                    component: () => import('@/views/pages/rolepermissions/RolePermissionCreate.vue')
                },
                   {
                    path: '/updateRolePermission/:id',
                    name: 'rol permission update',
                    component: () => import('@/views/pages/rolepermissions/RolePermissionUpdate.vue')
                },
                {
                    path: '/profile',
                    name: 'profile',
                    component: () => import('@/views/pages/profiles/ProfileListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/createProfile',
                    name: 'profile create',
                    component: () => import('@/views/pages/profiles/ProfileCreate.vue')
                },
                   {
                    path: '/updateProfile/:id',
                    name: 'profile update',
                    component: () => import('@/views/pages/profiles/ProfileUpdate.vue')
                },
                {
                    path: '/permission',
                    name: 'permission',
                    component: () => import('@/views/pages/permissions/PermissionListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/createPermission',
                    name: 'permission create',
                    component: () => import('@/views/pages/permissions/PermissionCreate.vue')
                },
                   {
                    path: '/updatePermission/:id',
                    name: 'permission update',
                    component: () => import('@/views/pages/permissions/PermissionUpdate.vue')
                },
                {
                    path: '/password',
                    name: 'password',
                    component: () => import('@/views/pages/passwords/PasswordListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/createPassword',
                    name: 'password create',
                    component: () => import('@/views/pages/passwords/PasswordCreate.vue')
                },
                   {
                    path: '/updatePassword/:id',
                    name: 'password update',
                    component: () => import('@/views/pages/passwords/PasswordUpdate.vue')
                },
                {
                    path: '/userRole',
                    name: 'userRole',
                    component: () => import('@/views/pages/userroles/UserRoleListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/createUserRole',
                    name: 'userRole create',
                    component: () => import('@/views/pages/userroles/UserRoleCreate.vue')
                },
                   {
                    path: '/updateUserRole/:id',
                    name: 'userRole update',
                    component: () => import('@/views/pages/userroles/UserRoleUpdate.vue')
                },
                {
                    path: '/address',
                    name: 'address',
                    component: () => import('@/views/pages/addresses/AddressListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/createAddress',
                    name: 'address create',
                    component: () => import('@/views/pages/addresses/AddressCreate.vue')
                },
                {
                    path: '/updateAddress/:id',
                    name: 'address update',
                    component: () => import('@/views/pages/addresses/AddressUpdate.vue')
                },
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/User',
                    name: 'users',
                    component: () => import('@/views/pages/users/UserListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/createUser',
                    name: 'users create',
                    component: () => import('@/views/pages/users/UserCreate.vue')
                },
                {
                    path: '/updateUser/:id',
                    name: 'users update',
                    component: () => import('@/views/pages/users/UserUpdate.vue')
                },
                {
                    path: '/login2',
                    name: 'login2',
                    component: () => import('@/views/pages/auth/Login2.vue')
                },
                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },
                {
                    path: '/uikit/input',
                    name: 'input',
                    component: () => import('@/views/uikit/InputDoc.vue')
                },
                {
                    path: '/uikit/button',
                    name: 'button',
                    component: () => import('@/views/uikit/ButtonDoc.vue')
                },
                {
                    path: '/uikit/table',
                    name: 'table',
                    component: () => import('@/views/uikit/TableDoc.vue')
                },
                {
                    path: '/uikit/list',
                    name: 'list',
                    component: () => import('@/views/uikit/ListDoc.vue')
                },
                {
                    path: '/uikit/tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/TreeDoc.vue')
                },
                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/PanelsDoc.vue')
                },

                {
                    path: '/uikit/overlay',
                    name: 'overlay',
                    component: () => import('@/views/uikit/OverlayDoc.vue')
                },
                {
                    path: '/uikit/media',
                    name: 'media',
                    component: () => import('@/views/uikit/MediaDoc.vue')
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/MessagesDoc.vue')
                },
                {
                    path: '/uikit/file',
                    name: 'file',
                    component: () => import('@/views/uikit/FileDoc.vue')
                },
                {
                    path: '/uikit/menu',
                    name: 'menu',
                    component: () => import('@/views/uikit/MenuDoc.vue')
                },
                {
                    path: '/uikit/charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/ChartDoc.vue')
                },
                {
                    path: '/uikit/misc',
                    name: 'misc',
                    component: () => import('@/views/uikit/MiscDoc.vue')
                },
                {
                    path: '/uikit/timeline',
                    name: 'timeline',
                    component: () => import('@/views/uikit/TimelineDoc.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/pages/Documentation.vue')
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

// Configurar el guardián de ruta
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();  // Obtener el estado de autenticación desde Pinia
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        // Si la ruta requiere autenticación y el usuario no está logueado, redirigir al login
        next({ path: '/login2' });
    } else {
        // Si no requiere autenticación o el usuario está logueado, continuar con la ruta
        next();
    }
});


export default router;
