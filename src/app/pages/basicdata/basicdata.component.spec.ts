import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicdataComponent } from './basicdata.component';

describe('BasicdataComponent', () => {
  let component: BasicdataComponent;
  let fixture: ComponentFixture<BasicdataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicdataComponent]
    });
    fixture = TestBed.createComponent(BasicdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
