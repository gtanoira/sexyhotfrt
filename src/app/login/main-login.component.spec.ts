import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MainLoginComponent } from './main-login.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        MainLoginComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MainLoginComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'sexyhotfrt'`, () => {
    const fixture = TestBed.createComponent(MainLoginComponent);
    const app = fixture.componentInstance;
    expect(app.activateLogin).toEqual(false);
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(MainLoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('sexyhotfrt app is running!');
  });
});
