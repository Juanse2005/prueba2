import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',

  },
  //Ruta inicial LOGIN
  {
    path: '',
    children: [
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule)
          }
        ]
      },
      //Vista y rutas de los usuarios
      {
        path: 'home',
        canActivate: [authGuard],
        data: { roles: [1] },
        children: [
          {
            path: '',
            loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
          },
          {
            path: 'preguntas/:id',
            loadChildren: () => import('./views/preguntas-us/preguntas-us.module').then(m => m.PreguntasUsModule),
          },
          {
            path: 'resultado/:asambleaId',
            loadChildren: () => import('./views/resultado/resultado.module').then(m => m.ResultadoModule),
          }
        ]
      },

      // Admin y super admin
      {
        path: 'asambleas',
        canActivate: [authGuard],
        data: { roles: [2, 3] },
        children: [
          {
            path: '',
            loadChildren: () => import('./views/asambleas/asambleas.module').then(m => m.AsambleasModule),
          },
          {
            path: 'preguntas/:id',
            loadChildren: () => import('./views/preguntas-us/preguntas-us.module').then(m => m.PreguntasUsModule),
          },
          {
            path: 'creacion-asamblea',
            loadChildren: () => import('./views/creacion-asamblea/creacion-asamblea.module').then(m => m.CreacionAsambleaModule),
          },
          {
            path: 'creacion-preguntas/:id',
            loadChildren: () => import('./views/creacion-preguntas/creacion-preguntas.module').then(m => m.CreacionPreguntasdModule),
          },
          {
            path: 'editar-preguntas/:id',
            loadChildren: () => import('./views/preguntas-ad/preguntas-ad.module').then(m => m.PreguntasAdModule),
          },
          {
            path: 'resultado/:asambleaId/:preguntaId',
            loadChildren: () => import('./views/resultado/resultado.module').then(m => m.ResultadoModule),
          }
        ]
      },

      //superadmin
      {
        path: 'administradores',
        canActivate: [authGuard],
        data: { roles: [3] },
        children: [
          {
            path: '',
            loadChildren: () => import('./views/administradores/administradores.module').then(m => m.AdministradoresModule),
          },
          {
            path: 'creacion-admin',
            loadChildren: () => import('./views/creacion-admin/creacion-admin.module').then(m => m.CreacionAdminModule),
          },
          {
            path: 'creacion-admin/:id',
            loadChildren: () => import('./views/creacion-admin/creacion-admin.module').then(m => m.CreacionAdminModule),
          },

        ]
      },

      //superadmin
      {
        path: 'conjuntos',
        canActivate: [authGuard],
        data: { roles: [3] },
        children: [
          {
            path: '',
            loadChildren: () => import('./views/conjuntos/conjuntos.module').then(m => m.ConjuntosModule),
          },
          {
            path: 'creacion-conjunto',
            loadChildren: () => import('./views/creacion-conjunto/creacion-conjunto.module').then(m => m.CreacionConjuntoModule),
          },
          {
            path: 'creacion-conjunto/:id',
            loadChildren: () => import('./views/creacion-conjunto/creacion-conjunto.module').then(m => m.CreacionConjuntoModule),
          },
        ]
      },

      {
        path: 'usuarios',
        canActivate: [authGuard],
        data: { roles: [2, 3] },
        children: [
          {
            path: ':id',
            loadChildren: () => import('./views/usuarios/usuarios.module').then(m => m.UsuarioModule),
          },
          {
            path: 'edicion-usuario/:conjuntoId/:userId',
            loadChildren: () => import('./views/edicion-usuario/edicion-usuario.module').then(m => m.EdicionUsuarioModule),
          },
        ]
      }
    ]
  },

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
