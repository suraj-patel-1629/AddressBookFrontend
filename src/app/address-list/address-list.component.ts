import { Component } from '@angular/core';
import { AddressService,Address } from '../services/address.service';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-address-list',
  imports: [CommonModule,RouterModule,FormsModule],
  standalone:true,
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.css'
})
export class AddressListComponent  {
   address:Address[]=[];
   searchText: string = ''; 
   
   constructor(private addressService:AddressService,
    private router:Router
   ){}

   ngOnInit(){
    this.loadAddress();
   }
   loadAddress(){
    this.addressService.getAllAddress().subscribe({
      next:(data)=>{
        
        this.address=data;
      },
      error:(error)=>{
        console.log('Error Fetching Employees:',error);
      }

    });
   }
   goToAddContact(){
    this.router.navigate(['/add-Address']);
   }

   filteredContacts(){
    
      return this.address;
   }
  deleteAddress(id?: number) {
    if (id !== undefined) {
      if (confirm('Are you sure you want to delete this employee?')) {
        this.addressService.deleteAddress(id).subscribe({
          next: () => {
            console.log('Employee deleted successfully'); 
            this.loadAddress();
          },
          error: (error) => {
            console.error('Error deleting employee:', error);
          }
        });
      }
    } else {
      console.error('Invalid employee ID:', id);
    }
  }
  updateEmployee(id?: number, address?: Address) {
    if (id !== undefined && address) {
      console.log('Updating employee with ID:', id, 'Data:', address);
      this.addressService.updateAddress(id, address).subscribe({
        next: () => {
          console.log('Employee updated successfully'); 
          this.loadAddress();
        },
        error: (err) => {
          console.error('Error updating employee:', err);
        }
      });
    } else {
      console.error('Invalid employee ID or data:', id, address);
    }
  }
}

