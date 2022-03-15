import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let el: HTMLElement;
  let de: DebugElement;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(),
        HttpClientTestingModule,
        IonicStorageModule.forRoot(),
        RouterTestingModule
    ],
    providers: [ 'IonRouterOutlet', 'IonRouterOutlet' ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;

    fixture.detectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title',()=>{
    const title = el.querySelector['title'];
    fixture.detectChanges();
    expect(title.textContent).toEqual('title:')
  })


});
