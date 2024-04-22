import { Component, OnInit, Input } from "@angular/core";
import { Customer } from '../app.component';

@Component({
  selector: "customer-search",
  templateUrl: "./customerSearch.component.html",
  styleUrls: ["./customerSearch.component.scss"]
})
export class CustomerSearch implements OnInit {
  @Input() customers: Customer[] =[];
  searchTerm:string='';
  searchedCustomers:Customer[] =[];

  constructor() {
  }

  ngOnInit() {

  }

  searchCustomers(){
    if(!this.searchTerm){
      this.searchedCustomers = this.customers;
      return ;
    }
    this.searchedCustomers = this.customers.filter(customer => customer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || customer.location.toLowerCase().includes(this.searchTerm.toLowerCase()))
  }
}
