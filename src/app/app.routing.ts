/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ExecutionComponent } from "./execution/execution.component";
import { HistoryComponent } from "./history/history.component";

import { NotFoundComponent } from './not-found/not-found.component';

import { ApplicationLogsComponent } from './boemska/logs/application-logs/application-logs.component';
import { DebugLogsComponent } from './boemska/logs/debug-logs/debug-logs.component';
import { FailedRequestsComponent } from './boemska/logs/failed-requests/failed-requests.component';
import { ErrorsComponent } from './boemska/logs/errors/errors.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'data', pathMatch: 'full' },
  { path: 'data', component: HomeComponent },
  { path: 'execution', component: ExecutionComponent },
  { path: 'history', component: HistoryComponent },

  { path: 'application-logs', component: ApplicationLogsComponent },
  { path: 'debug-logs', component: DebugLogsComponent },
  { path: 'failed-requests', component: FailedRequestsComponent },
  { path: 'errors', component: ErrorsComponent },

  { path: '**', component: NotFoundComponent }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES, {useHash: true });
