import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CanActivateViaAuthGuard } from './guards/guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/authentication/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/authentication/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'verification/:token',
    loadChildren: () => import('./pages/authentication/verification/verification.module').then(m => m.VerificationModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [CanActivateViaAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/introduction/introduction.module').then(m => m.IntroductionModule),
      },
      {
        path: 'my_account',
        loadChildren: () => import('./pages/apps/my-account/my-account.module').then(m => m.MyAccountModule),
        pathMatch: 'full'
      },
      {
        path: 'admin/plans',
        loadChildren: () => import('./pages/apps/plans-admin/plans-admin.module').then(m => m.PlansAdminModule),
      },
      {
        path: 'admin/companies',
        loadChildren: () => import('./pages/apps/companies/companies.module').then(m => m.CompaniesModule),
      },
      {
        path: 'admin/contracts',
        loadChildren: () => import('./pages/apps/contracts/contracts.module').then(m => m.ContractsModule),
      },
      {
        path: 'admin/rules',
        loadChildren: () => import('./pages/apps/rules/rules.module').then(m => m.RulesModule),
      },
      {
        path: 'company/query',
        loadChildren: () => import('./pages/apps/query/query.module').then(m => m.QueryModule),
      },
      {
        path: 'company/massive_queries',
        loadChildren: () => import('./pages/apps/massive-queries/massive-queries.module').then(m => m.MassiveQueriesModule),
      },
      {
        path: 'company/reports',
        loadChildren: () => import('./pages/apps/reports-client/reports-client.module').then(m => m.ReportsClientModule),
      },
      {
        path: 'company/glossary',
        loadChildren: () => import('./pages/apps/glossary-terms/glossary-terms.module').then(m => m.GlossaryTermsModule),
      },
      {
        path: 'company/videos',
        loadChildren: () => import('./pages/apps/video-tutorials/video-tutorials.module').then(m => m.VideoTutorialsModule),
      },
      {
        path: 'company/my_team',
        loadChildren: () => import('./pages/apps/user/user.module').then(m => m.UserModule),
      },
      {
        path: 'company/plans',
        loadChildren: () => import('./pages/apps/plans-client/plans-client.module').then(m => m.PlansClientModule),
      },
      {
        path: 'company/query_results',
        loadChildren: () => import('./pages/apps/query-results/query-results.module').then(m => m.QueryResultsModule),
      },
      {
        path: 'company/query_report',
        loadChildren: () => import('./pages/apps/query-report/query-report.module').then(m => m.QueryReportModule),
      },
      {
        path: 'company/rules',
        loadChildren: () => import('./pages/apps/rules/rules.module').then(m => m.RulesModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledNonBlocking',
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
