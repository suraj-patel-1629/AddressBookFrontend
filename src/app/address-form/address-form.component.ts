import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-address-form',
  standalone:true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})
export class AddressFormComponent implements OnInit{
 address:any={
  name:'',
  phoneNo:'',
  address:'',
  city:'',
  state:'',
  zipcode:''

 };
 formTitle: string='Add New Address';

 constructor(private route:ActivatedRoute,private router:Router,private addressService:AddressService){}

 addressId: number | null = null;

 ngOnInit(): void {
     this.route.paramMap.subscribe(param =>{
       const id = Number(param.get('id'));
      if(id){
        this.addressId=id;
        this.formTitle="update Address";
        this.loadAddress(this.addressId);
      }
     });
 }
 loadAddress(id:number){
  this.addressService.getAddressByID(id).subscribe(address=>{
    if(address){
    this.address={...address};
  }
  });
 }
 saveAddress(){
  const fromattedAddress={
    ...this.address
   

  }
  console.log(fromattedAddress);
   if (!this.address.name || !this.address.phoneNo || !this.address.city || 
        !this.address.state || !this.address.zipcode || !this.address.address) {
      alert('All fields are required!');
      return;
    }
   if(this.addressId){
    this.addressService.updateAddress(this.addressId,fromattedAddress).subscribe({
      next:()=>{
        console.log(`Address Updated successfully`);
        this.router.navigate(['/']);
      },
      error:(err)=>{
        console.log('Error in updating Address',err);
      }
    })
   }else{
    // Add New Employee
    this.addressService.addAddress(fromattedAddress).subscribe({
      next: () => {
        console.log('Address added successfully');
        this.router.navigate(['/']); 
      },
      error: (err) => console.error('Error adding Address:', err) 
    });
   }
 }

}
