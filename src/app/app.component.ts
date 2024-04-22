import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Customer Search';

  customers: Customer[] = [{
      name: "Jeremy Clarke",
      age: "21",
      id: 12345,
      gender: "Male",
      location: "Seattle",
      income: "$120,000"
    },
    {
      name: "Matty Bing",
      age: "25",
      id: 12225,
      gender: "Female",
      location: "Florida",
      income: "$950,000"
    },
    {
      name: "Philip Anderson",
      age: "18",
      id: 12455,
      gender: "Female",
      location: "New York City",
      income: "$150,000"
    },
    {
      name: "John Smith",
      age: "25",
      id: 13345,
      gender: "Male",
      location: "Philadephia",
      income: "$200,000"
    },
    {
      name: "Adam Gilly",
      age: "32",
      id: 12344,
      gender: "Male",
      location: "Denver",
      income: "$2,200,000"
    },
    {
      name: "Glenn Adams",
      age: "34",
      id: 12395,
      gender: "Male",
      location: "Dallas",
      income: "$4,200,000"
    },
    {
      name: "Stuart McGill",
      age: "32",
      id: 19945,
      gender: "Male",
      location: "Arlington",
      income: "$400,000"
    },
    {
      name: "Erica Edwards",
      age: "25",
      id: 11145,
      gender: "Female",
      location: "Portland",
      income: "$2,200,000"
    }
  ]
}

export interface Customer {
  name: string;
  gender: string;
  location: string;
  income: string;
  age: string;
  id: number;
}
