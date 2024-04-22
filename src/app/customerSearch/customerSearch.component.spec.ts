import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';
import {CustomerSearch} from './customerSearch.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('CustomerSearch', () => {
  let appInput;
  let searchedCustomers;
  let noResult;

  const pushValue = async (value, fixture) => {
    appInput.value = value;
    appInput.dispatchEvent(new Event('change'));
    appInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  };

  const getByTestId = (testId: string, compiled) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };

  const customers = [{
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
      name: "Erica Edwards",
      age: "25",
      id: 11145,
      gender: "Female",
      location: "Portland",
      income: "$2,200,000"
    }
  ]

  const factory = (customers) => {
    const fixture: ComponentFixture<CustomerSearch> = TestBed.createComponent(CustomerSearch);
    const component: CustomerSearch = fixture.componentInstance;
    component.customers = customers;
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    return {
      fixture,
      component,
      compiled
    };
  };

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule,
          FormsModule
        ],
        declarations: [CustomerSearch],
        schemas : [CUSTOM_ELEMENTS_SCHEMA]
      })
      .compileComponents();
  }));

  it('Initial UI is rendered as expected', async () => {
    const {compiled, fixture} = factory(customers);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);
    searchedCustomers = getByTestId('searched-customers', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(appInput.textContent.trim()).toBeFalsy();
    expect(searchedCustomers.children.length).toEqual(customers.length);
    customers.forEach((item, index) => {
      expect(searchedCustomers.children[index].children[0].textContent.trim()).toEqual(item.name);
      expect(searchedCustomers.children[index].children[1].textContent.trim()).toEqual(item.age);
      expect(searchedCustomers.children[index].children[2].textContent.trim()).toEqual(item.location);
      expect(searchedCustomers.children[index].children[3].textContent.trim()).toEqual(item.gender);
      expect(searchedCustomers.children[index].children[4].textContent.trim()).toEqual(item.income);
    })
    expect(noResult).toBeFalsy();
  });

  it('Searching with a search term that does not exist shows No Results Found', async () => {
    const {compiled, fixture} = factory(customers);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);

    await pushValue('James', fixture);
    await fixture.detectChanges();

    searchedCustomers = getByTestId('searched-customers', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(searchedCustomers).toBeFalsy();
    expect(noResult).toBeTruthy();
    expect(noResult.textContent.trim()).toEqual('No Results Found');
  });

  it('Should display customers beginning with the search substring across all fields', async () => {
    const {compiled, fixture} = factory(customers);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);

    await pushValue('Phil', fixture);
    await fixture.detectChanges();

    searchedCustomers = getByTestId('searched-customers', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(searchedCustomers).toBeTruthy();
    expect(searchedCustomers.children.length).toEqual(2);
    expect(searchedCustomers.children[0].children[0].textContent.trim()).toEqual('Philip Anderson');
    expect(searchedCustomers.children[0].children[1].textContent.trim()).toEqual('18');
    expect(searchedCustomers.children[0].children[2].textContent.trim()).toEqual('New York City');
    expect(searchedCustomers.children[0].children[3].textContent.trim()).toEqual('Female');
    expect(searchedCustomers.children[0].children[4].textContent.trim()).toEqual('$150,000');

    expect(searchedCustomers.children[1].children[0].textContent.trim()).toEqual('John Smith');
    expect(searchedCustomers.children[1].children[1].textContent.trim()).toEqual('25');
    expect(searchedCustomers.children[1].children[2].textContent.trim()).toEqual('Philadephia');
    expect(searchedCustomers.children[1].children[3].textContent.trim()).toEqual('Male');
    expect(searchedCustomers.children[1].children[4].textContent.trim()).toEqual('$200,000');

    expect(noResult).toBeFalsy();
  });

  it('Searching works when fields contains the substring', async () => {
    const {compiled, fixture} = factory(customers);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);

    await pushValue('r', fixture);
    await fixture.detectChanges();

    const expectedResult = [{
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
        name: "Adam Gilly",
        age: "32",
        id: 12344,
        gender: "Male",
        location: "Denver",
        income: "$2,200,000"
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

    searchedCustomers = getByTestId('searched-customers', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(searchedCustomers).toBeTruthy();
    expect(searchedCustomers.children.length).toEqual(expectedResult.length);
    expectedResult.forEach((item, index) => {
      expect(searchedCustomers.children[index].children[0].textContent.trim()).toEqual(item.name);
      expect(searchedCustomers.children[index].children[1].textContent.trim()).toEqual(item.age);
      expect(searchedCustomers.children[index].children[2].textContent.trim()).toEqual(item.location);
      expect(searchedCustomers.children[index].children[3].textContent.trim()).toEqual(item.gender);
      expect(searchedCustomers.children[index].children[4].textContent.trim()).toEqual(item.income);
    });
    expect(noResult).toBeFalsy();
  });

  it('Sequencing - search with results, then with no results, then with results', async () => {
    const {compiled, fixture} = factory(customers);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);

    await pushValue('2', fixture);
    await fixture.detectChanges();

    searchedCustomers = getByTestId('searched-customers', compiled);
    noResult = getByTestId('no-result', compiled);

    let expectedResult = [{
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
      name: "Erica Edwards",
      age: "25",
      id: 11145,
      gender: "Female",
      location: "Portland",
      income: "$2,200,000"
    }];

    expect(searchedCustomers).toBeTruthy();
    expect(searchedCustomers.children.length).toEqual(expectedResult.length);
    expectedResult.forEach((item, index) => {
      expect(searchedCustomers.children[index].children[0].textContent.trim()).toEqual(item.name);
      expect(searchedCustomers.children[index].children[1].textContent.trim()).toEqual(item.age);
      expect(searchedCustomers.children[index].children[2].textContent.trim()).toEqual(item.location);
      expect(searchedCustomers.children[index].children[3].textContent.trim()).toEqual(item.gender);
      expect(searchedCustomers.children[index].children[4].textContent.trim()).toEqual(item.income);
    });
    expect(noResult).toBeFalsy();

    await pushValue('Base', fixture);
    await fixture.detectChanges();

    searchedCustomers = getByTestId('searched-customers', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(searchedCustomers).toBeFalsy();
    expect(noResult).toBeTruthy();
    expect(noResult.textContent.trim()).toEqual('No Results Found');

    await pushValue('it', fixture);
    await fixture.detectChanges();

    expectedResult = [{
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
    }];

    searchedCustomers = getByTestId('searched-customers', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(searchedCustomers).toBeTruthy();
    expect(searchedCustomers.children.length).toEqual(expectedResult.length);
    expectedResult.forEach((item, index) => {
      expect(searchedCustomers.children[index].children[0].textContent.trim()).toEqual(item.name);
      expect(searchedCustomers.children[index].children[1].textContent.trim()).toEqual(item.age);
      expect(searchedCustomers.children[index].children[2].textContent.trim()).toEqual(item.location);
      expect(searchedCustomers.children[index].children[3].textContent.trim()).toEqual(item.gender);
      expect(searchedCustomers.children[index].children[4].textContent.trim()).toEqual(item.income);
    });
    expect(noResult).toBeFalsy();
  });
});
