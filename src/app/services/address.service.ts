import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Address{
  id?:number;
  name:string;
  phoneNo:string;
  city:string;
  state:string;
  zipcode:string;
 address:string;
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl='http://localhost:8080/address';
  private httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private http:HttpClient) { }

  getAllAddress():Observable<Address[]>{
    return this.http.get<Address[]>(`${this.apiUrl}/getall`);
  }
  deleteAddress(id:Number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete/${id}`,{responseType:'text'});
  }

    getAddressByID(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/get/${id}`);
  }
   addAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiUrl}/create`, address, this.httpOptions);
  }

  updateAddress(id: number, address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.apiUrl}/update/${id}`, address, this.httpOptions);
  }


}
