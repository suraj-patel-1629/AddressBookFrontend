import { Routes } from '@angular/router';
import { AddressFormComponent } from './address-form/address-form.component';
import { AddressListComponent } from './address-list/address-list.component';

export const routes: Routes = [
{path:'add-Address',component:AddressFormComponent},
{path:'',component:AddressListComponent},
{path:'edit/:id',component:AddressFormComponent}
];
