export type SubItem = { label: string, url: string };

//ROl 1: Asambleista, 2: Admin, 3: Superadmin
export type Rol = 1 | 2 | 3;

export const menuLinks: Record<Rol, { label: string, url: string, subItems?: SubItem[] }[]> = {
  1: [
    { label: 'Home', url: '/home' }
  ],
  2: [
    {
      label: 'Asambleas', url: '/asambleas', subItems: [
        { label: 'Tabla de asambleas', url: '/asambleas' },
        { label: 'Crear nueva asamblea', url: '/asambleas/creacion-asamblea' }
      ]
    }
  ],
  3: [
    {
      label: 'Administradores', url: '/administradores', subItems: [
        { label: 'Tabla de administradores', url: '/administradores' },
        { label: 'Crear nuevo administrador', url: '/administradores/creacion-admin' }
      ]
    },
    {
      label: 'Asambleas', url: '/asambleas', subItems: [
        { label: 'Tabla de asambleas', url: '/asambleas' },
        { label: 'Crear nueva asamblea', url: '/asambleas/creacion-asamblea' }
      ]
    },
    {
      label: 'Conjuntos', url: '/conjuntos', subItems: [
        { label: 'Tabla de conjuntos', url: '/conjuntos' },
        { label: 'Crear nuevo conjunto', url: '/conjuntos/creacion-conjunto' }
      ]
    },
  ]
};
