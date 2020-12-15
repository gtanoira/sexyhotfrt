import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBatchsComponent } from './import-batchs.component';

describe('ImportBatchsComponent', () => {
  let component: ImportBatchsComponent;
  let fixture: ComponentFixture<ImportBatchsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportBatchsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportBatchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
